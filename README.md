# 🌌 Zenith

> **Zenith** is a modern Full-Stack project management application built with cutting-edge technologies, combining powerful task management, real-time collaboration, and elegant UI design.

---

## 🚀 About The Project

Zenith is designed as a scalable platform for project and task management, emphasizing modern user interface design and strong data typing. The application leverages the latest React ecosystem (version 19) and advanced server state management systems.

### ✨ Key Features

-   📋 **Project Management** - Create, organize, and manage multiple projects
-   📝 **Task Organization** - Drag-and-drop task management with categories
-   👥 **Team Collaboration** - Share projects with role-based access control (Owner/Editor/Viewer)
-   🎯 **Real-time Updates** - Optimistic UI updates with automatic rollback on errors
-   🔐 **Role-Based Access** - Granular permissions system (Owner, Editor, Viewer)
-   🎨 **Modern UI** - Beautiful, responsive interface with Material Design
-   🔄 **Drag & Drop** - Intuitive task and category reordering
-   📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

### 🎨 Frontend

**Core Technologies:**

-   [React 19](https://react.dev/) - Latest version with enhanced performance
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
-   [Material UI v7](https://mui.com/) - Modern component library
-   [Emotion](https://emotion.sh/) - CSS-in-JS styling

**State Management & Data Fetching:**

-   [TanStack Query v5](https://tanstack.com/query/latest) - Powerful async state management
-   [Axios](https://axios-http.com/) - HTTP client with interceptors
-   Optimistic updates with automatic rollback

**Form Management:**

-   [React Hook Form](https://react-hook-form.com/) - Performant form library
-   [Zod](https://zod.dev/) - TypeScript-first schema validation
-   [@hookform/resolvers](https://github.com/react-hook-form/resolvers) - Validation integration

**Routing & Navigation:**

-   [React Router v7](https://reactrouter.com/) - Declarative routing

**UI/UX Libraries:**

-   [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) - Drag and drop functionality
-   [Notistack](https://notistack.com/) - Toast notification system
-   Custom Glass morphism components

**Development Tools:**

-   [ESLint](https://eslint.org/) - Code linting
-   [Prettier](https://prettier.io/) - Code formatting
-   React Testing Library - Component testing

### ⚙️ Backend

**⚠️ Note:** Backend is currently being migrated from C# to NestJS.

**Target Technologies:**

-   [NestJS](https://nestjs.com/) - Progressive Node.js framework
-   [Prisma](https://www.prisma.io/) - Next-generation ORM
-   [PostgreSQL](https://www.postgresql.org/) - Relational database
-   [TypeScript](https://www.typescriptlang.org/) - Type-safe backend
-   Docker - Containerization

**Status:** 🚧 Under Development

---

## 📂 Project Structure

```text
zenith/
├── frontend/                    # React 19 Frontend Application
│   ├── public/                  # Static assets
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── api/                 # API configuration (Axios instance)
│   │   ├── components/          # Shared components
│   │   │   ├── layouts/         # Layout components (MainLayout)
│   │   │   ├── ui/              # Reusable UI components (GlassButton, Scrollbar)
│   │   │   ├── AppHeader.tsx
│   │   │   ├── EditBox.tsx      # Inline editing component
│   │   │   ├── RoleChip.tsx
│   │   │   └── SideMenu.tsx
│   │   ├── features/            # Feature-based modules
│   │   │   ├── auth/            # Authentication
│   │   │   │   ├── api/         # Auth API calls
│   │   │   │   ├── components/  # Login, Register forms
│   │   │   │   ├── hooks/       # useAuth, useLogin, useRegister
│   │   │   │   └── types/       # Auth schemas (Zod)
│   │   │   ├── projects/        # Project management
│   │   │   │   ├── api/         # Project API
│   │   │   │   ├── components/  # ProjectCard, ProjectDetails, ProjectMembersDialog
│   │   │   │   ├── hooks/       # useProjects, useProjectDetails, useDeleteProject
│   │   │   │   └── types/       # Project schemas
│   │   │   ├── categories/      # Category management
│   │   │   │   ├── api/         # Category API
│   │   │   │   ├── components/  # CategoryView, CategoriesView, CreateCategoryDialog
│   │   │   │   ├── hooks/       # useCategories, useReorderCategory, useDeleteCategory
│   │   │   │   └── types/       # Category schemas
│   │   │   ├── tasks/           # Task management
│   │   │   │   ├── api/         # Task API
│   │   │   │   ├── components/  # TaskView, TasksView, CreateTaskDialog, UpdateTaskDialog
│   │   │   │   ├── hooks/       # useTasks, useMoveTask, useUpdateTask, useDeleteTask
│   │   │   │   └── types/       # Task schemas
│   │   │   └── users/           # User management
│   │   │       ├── api/         # User API
│   │   │       ├── components/  # UserProfile, SearchUserDialog
│   │   │       ├── hooks/       # useUserProfile, useSearchUsers
│   │   │       └── types/       # User schemas
│   │   ├── hooks/               # Global custom hooks
│   │   │   ├── useDebounce.ts
│   │   │   └── useRoleColor.ts
│   │   ├── routes/              # Route configuration
│   │   ├── theme/               # MUI theme configuration
│   │   ├── types/               # Global TypeScript types
│   │   │   └── projectRoles.tsx # Role enums (Owner, Editor, Viewer)
│   │   ├── App.tsx              # Root component
│   │   ├── index.tsx            # Entry point
│   │   └── index.css            # Global styles
│   ├── package.json             # Dependencies
│   └── tsconfig.json            # TypeScript config
├── backend/                     # NestJS Backend (Under Development)
│   ├── src/
│   │   └── (TBD - Prisma + NestJS modules)
│   └── package.json
├── docker-compose.yml           # Docker configuration
└── README.md                    # Project documentation
```

---

## 🎯 Core Features Breakdown

### Project Management

-   Create and organize multiple projects
-   Project dashboard with statistics
-   Real-time project updates
-   Project search functionality

### Task Management

-   Create, update, and delete tasks
-   Organize tasks in categories
-   Drag-and-drop task reordering
-   Move tasks between categories
-   Mark tasks as complete/incomplete
-   Task descriptions and metadata

### Drag & Drop System

-   Intuitive drag-and-drop interface
-   Smooth animations with instant feedback
-   Optimistic UI updates
-   Works across categories
-   Category reordering support

### Collaboration Features

-   Invite users to projects
-   Role-based permissions:
    -   **Owner**: Full control (delete project, manage members, edit everything)
    -   **Editor**: Edit content (create/edit/delete tasks and categories)
    -   **Viewer**: Read-only access
-   View project members
-   Remove members from projects
-   User search functionality

### User Experience

-   Glass morphism design
-   Responsive layout (mobile, tablet, desktop)
-   Toast notifications for all actions
-   Loading states and error handling
-   Optimistic updates with rollback
-   Empty states with helpful messages

---

## 🗄️ Database Schema

The application uses **PostgreSQL** as its database with **Prisma ORM** for type-safe database access.

### Database Diagram

![Database Schema](./screenshots/database_diagram.png)

### Database Relations

#### **User** (Authentication & Identity)

-   Stores user credentials and profile information
-   Fields: `id`, `email` (unique), `firstname`, `lastname`, `password` (hashed)
-   **Relations:**
    -   One user can have many project memberships (`User` → `ProjectMembership`)

#### **Project** (Project Container)

-   Main organizational unit for tasks and categories
-   Fields: `id`, `name`
-   **Relations:**
    -   One project has many memberships (`Project` → `ProjectMembership`)
    -   One project has many categories (`Project` → `Category`)
-   **Cascade Delete:** Deleting a project removes all related memberships and categories

#### **ProjectMembership** (Access Control)

-   Junction table managing user access to projects with role-based permissions
-   Fields: `projectId`, `userId`, `role` (OWNER/EDITOR/VIEWER)
-   **Composite Primary Key:** `(projectId, userId)` - ensures unique user-project combinations
-   **Relations:**
    -   Belongs to one project (`ProjectMembership` → `Project`)
    -   Belongs to one user (`ProjectMembership` → `User`)
-   **Cascade Delete:** Removing a user or project automatically removes the membership

#### **Role Enum**

Role-based access control with three permission levels:

-   **OWNER**: Full control - can delete project, manage members, edit all content
-   **EDITOR**: Can create, edit, and delete categories and tasks
-   **VIEWER**: Read-only access to project content

#### **Category** (Task Grouping)

-   Organizes tasks into logical groups (e.g., "To Do", "In Progress", "Done")
-   Fields: `id`, `name`, `projectId`, `order` (for custom sorting)
-   **Relations:**
    -   Belongs to one project (`Category` → `Project`)
    -   One category has many tasks (`Category` → `Task`)
-   **Cascade Delete:** Deleting a category removes all its tasks

#### **Task** (Work Items)

-   Individual work items within a category
-   Fields: `id`, `title`, `description`, `categoryId`, `order`, `isCompleted`
-   **Relations:**
    -   Belongs to one category (`Task` → `Category`)
-   **Cascade Delete:** Automatically removed when parent category is deleted

### Key Database Features

-   **UUID Primary Keys**: All entities use UUIDs for distributed system compatibility
-   **Cascade Deletes**: Hierarchical deletion ensures data consistency
-   **Composite Keys**: `ProjectMembership` uses composite key to prevent duplicate assignments
-   **Unique Constraints**: Email addresses are unique across users
-   **Ordered Lists**: Categories and tasks have `order` fields for custom sorting
-   **Optional Fields**: Lastname and task description are nullable for flexibility

---

## 🚀 Getting Started

### Prerequisites

-   **Docker** & **Docker Compose** (recommended)
-   **Node.js 18+** (for local development without Docker)
-   **npm** or **yarn**

### Quick Start with Docker (Recommended)

The easiest way to run Zenith is using Docker Compose, which will set up:

-   PostgreSQL database (port 5433)
-   PgAdmin for database management (port 5051)
-   NestJS backend (port 3000)
-   React frontend (port 8080)

**1. Clone the repository:**

```bash
git clone https://github.com/jakubkoldarz/zenith.git
cd zenith
```

**2. Create environment file:**

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_USER=zenith_user
DB_PASSWORD=zenith_password
DB_NAME=zenith_db

# JWT Secret (use a strong random string in production)
JWT_SECRET=secret-token

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:8080,http://localhost:3000,http://localhost:3001
```

**3. Start all services:**

```bash
docker-compose up -d
```

This will start:

-   **Backend**: http://localhost:3000
-   **Frontend**: http://localhost:8080
-   **PgAdmin**: http://localhost:5051 (email: `admin@admin.com`, password: `admin`)
-   **Database**: PostgreSQL on port 5433

**4. Check if everything is running:**

```bash
docker-compose ps
```

**5. View logs (if needed):**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

**6. Stop the application:**

```bash
docker-compose down
```

**7. Stop and remove all data (including database):**

```bash
docker-compose down -v
```

### Local Development (Without Docker)

If you prefer to run services individually:

**Backend:**

```bash
cd backend
npm install

# Create .env file with DATABASE_URL, JWT_SECRET
echo "DATABASE_URL=postgresql://user:password@localhost:5433/zenith_db" > .env
echo "JWT_SECRET=your-secret-key" >> .env

# Run Prisma migrations
npx prisma migrate dev

# Start backend
npm run start:dev
```

**Frontend:**

```bash
cd frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:3000/api/" > .env

# Start frontend
npm start
```

### Database Management

**Access PgAdmin:**

1. Open http://localhost:5051
2. Login with:
    - Email: `admin@admin.com`
    - Password: `admin`
3. Add new server:
    - Name: Zenith
    - Host: `db-nest` (or `localhost` if connecting from outside Docker)
    - Port: `5432` (internal) or `5433` (external)
    - Username: `zenith_user`
    - Password: `zenith_password`

**Run Prisma Studio (Database GUI):**

```bash
cd backend
npx prisma studio
```

Opens on http://localhost:5555

---

## License

This project is part of a university assignment.

---

## 👨‍💻 Author

**Jakub Kołdarz**

-   GitHub: [@jakubkoldarz](https://github.com/jakubkoldarz)
