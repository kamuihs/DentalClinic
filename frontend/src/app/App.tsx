import { useState, useEffect, useCallback } from "react";
import { toast, Toaster } from "sonner";
import {
  Users, Stethoscope, Calendar, FileText, DollarSign,
  CalendarClock, MessageSquare, Plus, Pencil, Trash2,
  X, RefreshCw, Settings, ChevronDown, ChevronUp,
  Activity, Loader2
} from "lucide-react";

type Module = "pacientes" | "profissionais" | "consultas" | "prontuarios" | "financeiro" | "agenda" | "crm";

const moduleConfig = [
  { id: "pacientes" as Module, label: "Pacientes", icon: Users, accent: "#3b82f6" },
  { id: "profissionais" as Module, label: "Profissionais", icon: Stethoscope, accent: "#10b981" },
  { id: "consultas" as Module, label: "Consultas", icon: Calendar, accent: "#8b5cf6" },
  { id: "prontuarios" as Module, label: "Prontuários", icon: FileText, accent: "#f59e0b" },
  { id: "financeiro" as Module, label: "Financeiro", icon: DollarSign, accent: "#22c55e" },
  { id: "agenda" as Module, label: "Agenda", icon: CalendarClock, accent: "#f97316" },
  { id: "crm" as Module, label: "CRM", icon: MessageSquare, accent: "#ec4899" },
];

type FieldDef = { key: string; label: string; type: string; required?: boolean };

const formFields: Record<Module, FieldDef[]> = {
  pacientes: [
    { key: "nome", label: "Nome", type: "text", required: true },
    { key: "cpf", label: "CPF", type: "text", required: true },
    { key: "data_nascimento", label: "Data de Nascimento", type: "date" },
    { key: "telefone", label: "Telefone", type: "tel" },
    { key: "email", label: "E-mail", type: "email" },
    { key: "endereco", label: "Endereço", type: "text" },
  ],
  profissionais: [
    { key: "nome", label: "Nome", type: "text", required: true },
    { key: "especialidade", label: "Especialidade", type: "text" },
    { key: "registro_profissional", label: "Registro (CRO)", type: "text" },
    { key: "telefone", label: "Telefone", type: "tel" },
    { key: "email", label: "E-mail", type: "email" },
  ],
  consultas: [
    { key: "paciente_id", label: "ID do Paciente", type: "number", required: true },
    { key: "profissional_id", label: "ID do Profissional", type: "number", required: true },
    { key: "data_consulta", label: "Data da Consulta", type: "datetime-local" },
    { key: "status", label: "Status", type: "select:agendada,realizada,cancelada" },
    { key: "observacoes", label: "Observações", type: "textarea" },
  ],
  prontuarios: [
    { key: "consulta_id", label: "ID da Consulta", type: "number", required: true },
    { key: "descricao", label: "Descrição", type: "textarea" },
    { key: "anexos", label: "Anexos (URLs)", type: "text" },
  ],
  financeiro: [
    { key: "consulta_id", label: "ID da Consulta", type: "number", required: true },
    { key: "valor", label: "Valor (R$)", type: "number" },
    { key: "tipo", label: "Tipo", type: "select:receita,despesa" },
    { key: "status", label: "Status", type: "select:pago,pendente,cancelado" },
    { key: "data_pagamento", label: "Data de Pagamento", type: "date" },
    { key: "observacoes", label: "Observações", type: "textarea" },
  ],
  agenda: [
    { key: "profissional_id", label: "ID do Profissional", type: "number", required: true },
    { key: "data_hora", label: "Data e Hora", type: "datetime-local" },
    { key: "status", label: "Status", type: "select:disponivel,ocupado,cancelado" },
    { key: "observacoes", label: "Observações", type: "textarea" },
  ],
  crm: [
    { key: "paciente_id", label: "ID do Paciente", type: "number", required: true },
    { key: "tipo_contato", label: "Tipo de Contato", type: "select:ligacao,email,whatsapp,presencial" },
    { key: "descricao", label: "Descrição", type: "textarea" },
    { key: "proximo_contato", label: "Próximo Contato", type: "datetime-local" },
    { key: "status", label: "Status", type: "select:ativo,finalizado,pendente" },
  ],
};

const tableColumns: Record<Module, { key: string; label: string }[]> = {
  pacientes: [
    { key: "id", label: "ID" }, { key: "nome", label: "Nome" },
    { key: "cpf", label: "CPF" }, { key: "data_nascimento", label: "Nascimento" },
    { key: "telefone", label: "Telefone" }, { key: "email", label: "E-mail" },
  ],
  profissionais: [
    { key: "id", label: "ID" }, { key: "nome", label: "Nome" },
    { key: "especialidade", label: "Especialidade" }, { key: "registro_profissional", label: "Registro" },
    { key: "telefone", label: "Telefone" }, { key: "email", label: "E-mail" },
  ],
  consultas: [
    { key: "id", label: "ID" }, { key: "paciente", label: "Paciente" },
    { key: "profissional", label: "Profissional" }, { key: "data_consulta", label: "Data" },
    { key: "status", label: "Status" }, { key: "observacoes", label: "Obs." },
  ],
  prontuarios: [
    { key: "id", label: "ID" }, { key: "consulta_id", label: "Consulta" },
    { key: "paciente", label: "Paciente" }, { key: "descricao", label: "Descrição" },
    { key: "criado_em", label: "Criado em" },
  ],
  financeiro: [
    { key: "id", label: "ID" }, { key: "paciente", label: "Paciente" },
    { key: "valor", label: "Valor" }, { key: "tipo", label: "Tipo" },
    { key: "status", label: "Status" }, { key: "data_pagamento", label: "Pagamento" },
  ],
  agenda: [
    { key: "id", label: "ID" }, { key: "profissional", label: "Profissional" },
    { key: "data_hora", label: "Data/Hora" }, { key: "status", label: "Status" },
    { key: "observacoes", label: "Obs." },
  ],
  crm: [
    { key: "id", label: "ID" }, { key: "paciente", label: "Paciente" },
    { key: "tipo_contato", label: "Tipo" }, { key: "descricao", label: "Descrição" },
    { key: "data_contato", label: "Contato" }, { key: "status", label: "Status" },
  ],
};

const statusColors: Record<string, string> = {
  agendada: "bg-blue-100 text-blue-700",
  realizada: "bg-emerald-100 text-emerald-700",
  cancelada: "bg-red-100 text-red-700",
  pago: "bg-emerald-100 text-emerald-700",
  pendente: "bg-amber-100 text-amber-700",
  cancelado: "bg-red-100 text-red-700",
  disponivel: "bg-emerald-100 text-emerald-700",
  ocupado: "bg-blue-100 text-blue-700",
  ativo: "bg-blue-100 text-blue-700",
  finalizado: "bg-gray-100 text-gray-600",
  receita: "bg-emerald-100 text-emerald-700",
  despesa: "bg-red-100 text-red-700",
  ligacao: "bg-purple-100 text-purple-700",
  email: "bg-blue-100 text-blue-700",
  whatsapp: "bg-emerald-100 text-emerald-700",
  presencial: "bg-amber-100 text-amber-700",
};

function formatCell(value: unknown, key: string): string {
  if (value === null || value === undefined || value === "") return "—";
  if (key === "valor") return `R$ ${Number(value).toFixed(2)}`;
  if (typeof value === "string" && (key.includes("data") || key.includes("hora") || key === "criado_em")) {
    try {
      return new Date(value).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    } catch { return String(value); }
  }
  const str = String(value);
  if (str.length > 60) return str.slice(0, 58) + "…";
  return str;
}

function StatusBadge({ value }: { value: string }) {
  const cls = statusColors[value?.toLowerCase()] ?? "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${cls}`}>
      {value}
    </span>
  );
}

const STATUS_KEYS = new Set(["status", "tipo", "tipo_contato"]);

export default function App() {
  const [baseUrl, setBaseUrl] = useState(() => localStorage.getItem("dental_base_url") ?? "http://localhost:3000");
  const [editingUrl, setEditingUrl] = useState(false);
  const [tempUrl, setTempUrl] = useState(baseUrl);

  const [activeModule, setActiveModule] = useState<Module>("pacientes");
  const [records, setRecords] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const api = useCallback(
    (path: string, init?: RequestInit) => fetch(`${baseUrl}${path}`, init),
    [baseUrl]
  );

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api(`/${activeModule}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro ao carregar ${activeModule}: ${msg}`);
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, [api, activeModule]);

  useEffect(() => { loadRecords(); }, [loadRecords]);

  function openCreate() {
    setEditRecord(null);
    const blank: Record<string, string> = {};
    formFields[activeModule].forEach(f => { blank[f.key] = ""; });
    setFormData(blank);
    setModalOpen(true);
  }

  function openEdit(rec: Record<string, unknown>) {
    setEditRecord(rec);
    const filled: Record<string, string> = {};
    formFields[activeModule].forEach(f => {
      const v = rec[f.key];
      if (v !== null && v !== undefined) {
        if (f.type === "datetime-local" && typeof v === "string") {
          filled[f.key] = v.slice(0, 16);
        } else {
          filled[f.key] = String(v);
        }
      } else {
        filled[f.key] = "";
      }
    });
    setFormData(filled);
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const body: Record<string, unknown> = {};
    formFields[activeModule].forEach(f => {
      const v = formData[f.key];
      if (f.type === "number") body[f.key] = v === "" ? null : Number(v);
      else body[f.key] = v === "" ? null : v;
    });
    try {
      const isEdit = editRecord !== null;
      const url = isEdit ? `/${activeModule}/${editRecord!.id}` : `/${activeModule}`;
      const res = await api(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? `HTTP ${res.status}`);
      }
      toast.success(isEdit ? "Registro atualizado!" : "Registro criado!");
      setModalOpen(false);
      loadRecords();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const res = await api(`/${activeModule}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast.success("Registro excluído.");
      setDeleteConfirm(null);
      loadRecords();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      toast.error(`Erro ao excluir: ${msg}`);
    }
  }

  const activeConf = moduleConfig.find(m => m.id === activeModule)!;
  const cols = tableColumns[activeModule];
  const fields = formFields[activeModule];

  return (
    <div className="flex h-screen bg-background font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      <Toaster position="top-right" richColors />

      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-200 ${sidebarOpen ? "w-56" : "w-16"} shrink-0 border-r border-sidebar-border`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center shrink-0">
            <Activity className="w-4 h-4 text-sidebar-primary-foreground" strokeWidth={2.5} />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-tight">DentalClinic</p>
              <p className="text-xs text-sidebar-foreground/50 leading-tight">API Tester</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {moduleConfig.map(({ id, label, icon: Icon, accent }) => {
            const active = activeModule === id;
            return (
              <button
                key={id}
                onClick={() => setActiveModule(id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-white"
                }`}
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: active ? accent : undefined }}
                  strokeWidth={active ? 2.5 : 2}
                />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </button>
            );
          })}
        </nav>

        {/* URL config */}
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => { setEditingUrl(true); setTempUrl(baseUrl); }}
            className="w-full flex items-center gap-2 text-xs text-sidebar-foreground/50 hover:text-sidebar-foreground/80 transition-colors"
          >
            <Settings className="w-3.5 h-3.5 shrink-0" />
            {sidebarOpen && <span className="truncate">{baseUrl}</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(v => !v)}
              className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
            >
              <div className="w-4 h-3 flex flex-col justify-between">
                <span className="block w-full h-0.5 bg-current rounded" />
                <span className="block w-3/4 h-0.5 bg-current rounded" />
                <span className="block w-full h-0.5 bg-current rounded" />
              </div>
            </button>
            <div>
              <h1 className="text-base font-bold text-foreground flex items-center gap-2">
                <activeConf.icon className="w-4 h-4" style={{ color: activeConf.accent }} strokeWidth={2.5} />
                {activeConf.label}
              </h1>
              <p className="text-xs text-muted-foreground font-mono">
                {baseUrl}/{activeModule}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={loadRecords}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-md hover:bg-muted/60 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Recarregar
            </button>
            <button
              onClick={openCreate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-primary-foreground rounded-md transition-colors"
              style={{ background: activeConf.accent }}
            >
              <Plus className="w-3.5 h-3.5" />
              Novo
            </button>
          </div>
        </header>

        {/* Table area */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-48 gap-2 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Carregando...</span>
              </div>
            ) : records.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-2 text-muted-foreground">
                <activeConf.icon className="w-8 h-8 opacity-30" />
                <p className="text-sm">Nenhum registro encontrado.</p>
                <button
                  onClick={openCreate}
                  className="text-xs font-semibold underline"
                  style={{ color: activeConf.accent }}
                >
                  Criar o primeiro
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40">
                      {cols.map(c => (
                        <th key={c.key} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                          {c.label}
                        </th>
                      ))}
                      <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec, i) => (
                      <tr
                        key={rec.id as string ?? i}
                        className="border-b border-border/60 hover:bg-muted/30 transition-colors last:border-0"
                      >
                        {cols.map(c => (
                          <td key={c.key} className="px-4 py-3 text-foreground/90 whitespace-nowrap">
                            {STATUS_KEYS.has(c.key) && rec[c.key] ? (
                              <StatusBadge value={String(rec[c.key])} />
                            ) : (
                              <span className={c.key === "id" ? "font-mono text-xs text-muted-foreground" : ""}>
                                {formatCell(rec[c.key], c.key)}
                              </span>
                            )}
                          </td>
                        ))}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(rec)}
                              className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                              title="Editar"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(rec.id as number)}
                              className="p-1.5 rounded text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
                              title="Excluir"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-2 border-t border-border/60 bg-muted/20">
                  <p className="text-xs text-muted-foreground">
                    {records.length} registro{records.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-5 py-4 border-b border-border sticky top-0 bg-card">
              <h2 className="text-sm font-bold flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ background: activeConf.accent }}
                />
                {editRecord ? `Editar ${activeConf.label}` : `Novo em ${activeConf.label}`}
                {editRecord && (
                  <span className="font-mono text-xs text-muted-foreground ml-1">#{editRecord.id as number}</span>
                )}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {fields.map(field => {
                const isSelect = field.type.startsWith("select:");
                const isTextarea = field.type === "textarea";
                const options = isSelect ? field.type.split(":")[1].split(",") : [];

                return (
                  <div key={field.key} className="space-y-1.5">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {isSelect ? (
                      <select
                        value={formData[field.key] ?? ""}
                        onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                        required={field.required}
                        className="w-full bg-input-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Selecionar...</option>
                        {options.map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    ) : isTextarea ? (
                      <textarea
                        value={formData[field.key] ?? ""}
                        onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                        rows={3}
                        className="w-full bg-input-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        placeholder={field.label}
                      />
                    ) : (
                      <input
                        type={field.type}
                        value={formData[field.key] ?? ""}
                        onChange={e => setFormData(p => ({ ...p, [field.key]: e.target.value }))}
                        required={field.required}
                        placeholder={field.label}
                        className="w-full bg-input-background border border-border rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                  </div>
                );
              })}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2 text-sm border border-border rounded-md text-foreground hover:bg-muted/60 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2 text-sm font-semibold text-white rounded-md transition-colors flex items-center justify-center gap-2"
                  style={{ background: activeConf.accent, opacity: submitting ? 0.7 : 1 }}
                >
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {editRecord ? "Salvar Alterações" : "Criar Registro"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="font-bold text-base mb-1">Excluir registro?</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Esta ação não pode ser desfeita. O registro <span className="font-mono font-semibold">#{deleteConfirm}</span> será removido permanentemente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2 text-sm border border-border rounded-md hover:bg-muted/60 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* URL Edit Modal */}
      {editingUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setEditingUrl(false)} />
          <div className="relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-sm p-5">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-muted-foreground" />
              URL da API
            </h3>
            <input
              type="url"
              value={tempUrl}
              onChange={e => setTempUrl(e.target.value)}
              className="w-full bg-input-background border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground focus:outline-none focus:ring-2 focus:ring-ring mb-3"
              placeholder="http://localhost:3000"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setEditingUrl(false)}
                className="flex-1 py-2 text-sm border border-border rounded-md hover:bg-muted/60 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setBaseUrl(tempUrl);
                  localStorage.setItem("dental_base_url", tempUrl);
                  setEditingUrl(false);
                  toast.success("URL atualizada!");
                }}
                className="flex-1 py-2 text-sm font-semibold text-primary-foreground bg-primary hover:opacity-90 rounded-md transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
