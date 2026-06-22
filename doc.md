# ARQUITETURA COMPLETA

# SISTEMA DE PRONTUÁRIO ELETRÔNICO SAAS

Versão: 1.0

---

# 1. VISÃO GERAL

Sistema SaaS para:

* Clínicas Odontológicas
* Clínicas Médicas
* Clínicas de Estética
* Consultórios

Objetivos:

* Prontuário eletrônico
* Agenda
* CRM
* Financeiro
* Estoque
* Assinaturas digitais
* Teleconsulta
* Inteligência Artificial

---

# 2. ARQUITETURA GERAL

CLIENTES

├── Web (React)
├── Aplicativo Mobile (Flutter)
└── Portal do Paciente

↓

API GATEWAY

↓

BACKEND .NET 8

├── Auth Service
├── Patient Service
├── Schedule Service
├── Medical Record Service
├── Financial Service
├── CRM Service
├── Stock Service
├── Notification Service
└── AI Service

↓

SQL SERVER

↓

STORAGE

Azure Blob Storage

↓

INTEGRAÇÕES

WhatsApp
Google Calendar
Outlook
OpenAI
Assinatura Digital

---

# 3. TECNOLOGIAS

Backend

* ASP.NET Core 8
* Entity Framework Core
* JWT
* AutoMapper
* FluentValidation
* Swagger

Frontend Web

* React
* Typescript
* Material UI

Desktop (opcional)

* WPF
* MVVM

Mobile

* Flutter

Banco

* SQL Server 2022

Cache

* Redis

Mensageria

* RabbitMQ

Arquivos

* Azure Blob Storage

Logs

* Serilog

Monitoramento

* Grafana
* Prometheus

Containerização

* Docker

Orquestração

* Kubernetes

---

# 4. ESTRUTURA DA SOLUÇÃO

Solution

HealthSystem.sln

src

HealthSystem.API
HealthSystem.Application
HealthSystem.Domain
HealthSystem.Infrastructure
HealthSystem.Persistence
HealthSystem.Shared

tests

HealthSystem.Tests

---

# 5. CAMADAS

DOMAIN

Entidades
Interfaces
Enums
Regras de negócio

APPLICATION

Use Cases
DTOs
Validators
Services

INFRASTRUCTURE

Serviços externos

Persistence

Entity Framework
Repositories

API

Controllers
Middlewares
Filters

---

# 6. MÓDULO DE AUTENTICAÇÃO

Entidades

Usuario
Perfil
Permissao

Funcionalidades

Login
Logout
JWT
Refresh Token
2FA
Logs de acesso

Tabelas

Usuarios
Perfis
Permissoes
UsuarioPerfil
PerfilPermissao
RefreshTokens

---

# 7. MÓDULO PACIENTES

Tabela Pacientes

Id
Nome
CPF
RG
Nascimento
Sexo
Telefone
WhatsApp
Email
Endereco
Cidade
Estado
CEP

Relacionamentos

Paciente
→ Consultas

Paciente
→ Prontuarios

Paciente
→ Pagamentos

Paciente
→ Exames

Paciente
→ Documentos

---

# 8. MÓDULO PROFISSIONAIS

Tabela Profissionais

Id
Nome
Conselho
NumeroRegistro
Especialidade
Telefone
Email

Relacionamentos

Profissional
→ Agenda

Profissional
→ Consultas

Profissional
→ Evolucoes

---

# 9. MÓDULO AGENDA

Tabela Agendamentos

Id
PacienteId
ProfissionalId
Data
HoraInicio
HoraFim
Status

Status

Agendado
Confirmado
Atendido
Faltou
Cancelado

Funcionalidades

Drag and Drop
Agenda diária
Agenda semanal
Agenda mensal

---

# 10. MÓDULO PRONTUÁRIO

Tabela Prontuarios

Id
PacienteId
DataCriacao
Status

Tabela Evolucoes

Id
ProntuarioId
ProfissionalId
Texto
Data

Tabela Anexos

Id
ProntuarioId
NomeArquivo
UrlArquivo

---

# 11. MÓDULO ANAMNESE

Tabela Formularios

Id
Nome
Especialidade

Tabela Perguntas

Id
FormularioId
Pergunta

Tabela Respostas

Id
PerguntaId
PacienteId
Resposta

---

# 12. MÓDULO ODONTOGRAMA

Tabela Dentes

Id
Numero

Tabela ProcedimentosDente

Id
DenteId
PacienteId
Procedimento
Status

---

# 13. MÓDULO FINANCEIRO

Tabela Recebimentos

Id
PacienteId
Valor
DataVencimento
DataPagamento
Status

Tabela Despesas

Id
Descricao
Valor
Data

Tabela Caixa

Id
Data
SaldoInicial
SaldoFinal

---

# 14. MÓDULO ESTOQUE

Tabela Produtos

Id
Nome
Codigo
Categoria
Quantidade
Valor

Tabela Movimentacoes

Id
ProdutoId
Tipo
Quantidade
Data

---

# 15. MÓDULO CRM

Tabela Leads

Id
Nome
Telefone
Origem

Tabela Pipeline

Id
LeadId
Etapa

Etapas

Novo
Contato
Orçamento
Aprovado
Perdido

---

# 16. MÓDULO DOCUMENTOS

Tabela Documentos

Id
PacienteId
TipoDocumento
ArquivoUrl

Tipos

Contrato
Consentimento
Receita
Atestado

---

# 17. MÓDULO EXAMES

Tabela Exames

Id
PacienteId
Tipo
Arquivo
Data

---

# 18. MÓDULO NOTIFICAÇÕES

Tabela Notificacoes

Id
UsuarioId
Tipo
Mensagem
Lida

Tipos

Email
WhatsApp
Push
SMS

---

# 19. MÓDULO IA

Funcionalidades

Transcrição de consultas

Resumo clínico

Geração de evolução

Sugestão de tratamentos

Chat interno

---

# 20. ESTRUTURA DE API

/api/auth

POST login
POST refresh
POST logout

/api/pacientes

GET
POST
PUT
DELETE

/api/agendamentos

GET
POST
PUT
DELETE

/api/prontuarios

GET
POST
PUT
DELETE

/api/financeiro

GET
POST
PUT
DELETE

---

# 21. SEGURANÇA

JWT

HTTPS

Criptografia AES

Hash BCrypt

Controle de permissões

LGPD

Logs de auditoria

Controle de acesso por perfil

---

# 22. RELATÓRIOS

Pacientes

Atendimentos

Financeiro

Produção profissional

Faturamento

Inadimplência

Conversão de leads

---

# 23. INFRAESTRUTURA CLOUD

Azure

App Service

SQL Azure

Blob Storage

Redis Cache

Application Insights

Azure Key Vault

---

# 24. ROADMAP DE DESENVOLVIMENTO

FASE 1

Autenticação
Pacientes
Profissionais
Agenda

FASE 2

Prontuário
Anamnese
Documentos

FASE 3

Financeiro
CRM
Estoque

FASE 4

Portal do Paciente
Teleconsulta

FASE 5

Aplicativo Mobile

FASE 6

Inteligência Artificial

FASE 7

Multiempresa

FASE 8

Marketplace de integrações
