# 🦷 DentalClinic

A full-stack management system for dental clinics and private healthcare practices. Built with a REST API backend and a React frontend, covering the core operational needs of a modern clinic.

---

## 🚀 Tech Stack

**Backend**
- Node.js + Express
- PostgreSQL
- Prisma ORM
- Nodemon (dev)

**Frontend**
- React 18 + Vite
- Tailwind CSS v4
- shadcn/ui + Radix UI
- React Router

---

## 📦 Modules

| Module | Description |
|---|---|
| **Patients** | Registration and full patient records |
| **Professionals** | Dentist and staff management with CRO registry |
| **Appointments** | Scheduling with status tracking (scheduled / completed / cancelled) |
| **Medical Records** | Clinical notes and attachments linked to appointments |
| **Financial** | Revenue and expense tracking per appointment |
| **Agenda** | Availability management per professional |
| **CRM** | Patient contact history and follow-up tracking |

---

## 🗂️ Project Structure

```
DentalClinic/
├── backend/        # Node.js REST API (Express + Prisma)
├── frontend/       # React + Vite interface
├── docker/         # Docker configuration
├── package.json    # Root script to run both together
└── readme.md
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally or via Docker
- npm or pnpm

### 1. Clone the repository

```bash
git clone https://github.com/kamuihs/DentalClinic.git
cd DentalClinic
```

### 2. Configure the backend environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dentalclinic"
PORT=3000
```

### 3. Run database migrations

```bash
cd backend
npx prisma migrate dev
```

### 4. Install all dependencies

```bash
# From the root of the project
npm install
npm run install:all
```

### 5. Start both servers

```bash
npm run dev
```

This starts the backend on `http://localhost:3000` and the frontend on `http://localhost:5173` simultaneously.

---

## 🌐 API

The REST API follows standard resource-based routing:

```
GET    /pacientes
POST   /pacientes
PUT    /pacientes/:id
DELETE /pacientes/:id
```

The same pattern applies to: `/profissionais`, `/consultas`, `/prontuarios`, `/financeiro`, `/agenda`, `/crm`.

The frontend connects to the API via a configurable base URL (set via the ⚙️ icon in the sidebar).

---

## 🔧 Fix: inotify watchers (Linux)

If you get `ENOSPC: System limit for number of file watchers reached`:

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

---

## 📋 Roadmap

- [x] REST API with all core modules
- [x] React frontend with full CRUD interface
- [x] Monorepo setup with single `npm run dev` command
- [ ] JWT authentication and role-based access control
- [ ] Dashboard with charts and KPIs
- [ ] Docker Compose for full environment setup
- [ ] PDF report generation
- [ ] WhatsApp / email notification integration

---

## 📄 License

MIT