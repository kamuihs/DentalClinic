<div align="center">

# 🦷 DentalClinic

**A full-stack management system for dental clinics and private healthcare practices.**  
Built with a REST API backend and a React frontend, covering the core operational needs of a modern clinic.

<br/>

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)

</div>

---

## 📦 Modules

| Module | Description |
|---|---|
| 👥 **Patients** | Registration and full patient records |
| 🦷 **Professionals** | Dentist and staff management with CRO registry |
| 📅 **Appointments** | Scheduling with status tracking (scheduled / completed / cancelled) |
| 📋 **Medical Records** | Clinical notes and attachments linked to appointments |
| 💰 **Financial** | Revenue and expense tracking per appointment |
| 🗓️ **Agenda** | Availability management per professional |
| 💬 **CRM** | Patient contact history and follow-up tracking |

---

## 🚀 Tech Stack

<table>
<tr>
<td valign="top" width="50%">

**Backend**
- ⚙️ Node.js + Express
- 🐘 PostgreSQL
- 🔷 Prisma ORM
- 🔄 Nodemon (dev)

</td>
<td valign="top" width="50%">

**Frontend**
- ⚛️ React 18 + Vite
- 🎨 Tailwind CSS v4
- 🧩 shadcn/ui + Radix UI
- 🔀 React Router

</td>
</tr>
</table>

---

## 🗂️ Project Structure

```
DentalClinic/
├── backend/        # Node.js REST API (Express + Prisma)
├── frontend/       # React + Vite interface
├── docker/         # Docker configuration
├── package.json    # Root script to run both together
└── README.md
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

> Starts the backend on `http://localhost:3000` and the frontend on `http://localhost:5173` simultaneously.

---

## 🌐 API Overview

The REST API follows standard resource-based routing:

```
GET    /{resource}        → list all
POST   /{resource}        → create
PUT    /{resource}/:id    → update
DELETE /{resource}/:id    → delete
```

Available resources: `pacientes` · `profissionais` · `consultas` · `prontuarios` · `financeiro` · `agenda` · `crm`

> The frontend connects to the API via a configurable base URL — use the ⚙️ icon in the sidebar to set it.

---

## 🔧 Troubleshooting

<details>
<summary><b>ENOSPC: System limit for number of file watchers reached (Linux)</b></summary>

```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

</details>

<details>
<summary><b>Frontend can't reach the API (failed to fetch)</b></summary>

1. Make sure the backend is running on port `3000`
2. Check the base URL in the frontend sidebar (⚙️ icon)
3. Ensure CORS is enabled in the backend:

```js
const cors = require('cors');
app.use(cors());
```

</details>

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

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Made with ☕ and 🦷 by <a href="https://github.com/kamuihs">kamuihs</a>
</div>