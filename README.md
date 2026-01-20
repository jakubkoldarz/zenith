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

-   [Prettier](https://prettier.io/) - Code formatting

### ⚙️ Backend

**Core Technologies:**

-   [NestJS 11](https://nestjs.com/) - Progressive Node.js framework built with TypeScript
-   [TypeScript 5.7](https://www.typescriptlang.org/) - Type-safe backend development
-   [Prisma 6.19](https://www.prisma.io/) - Next-generation ORM with type safety
-   [PostgreSQL](https://www.postgresql.org/) - Robust relational database
-   [Docker](https://www.docker.com/) - Containerization and deployment

**Authentication & Security:**

-   [Passport.js](http://www.passportjs.org/) - Authentication middleware
-   [Passport-JWT](https://github.com/mikenicholson/passport-jwt) - JWT authentication strategy
-   [@nestjs/jwt](https://docs.nestjs.com/security/authentication) - JWT token generation and validation
-   [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Password hashing and encryption

**Validation & Transformation:**

-   [class-validator](https://github.com/typestack/class-validator) - Decorator-based validation
-   [class-transformer](https://github.com/typestack/class-transformer) - Object transformation and serialization
-   [@nestjs/mapped-types](https://docs.nestjs.com/openapi/mapped-types) - DTO mapping utilities

**Configuration & Environment:**

-   [@nestjs/config](https://docs.nestjs.com/techniques/configuration) - Configuration management
-   Environment variables (.env) - Secure credentials storage

**Architecture Patterns:**

-   RESTful API design with `/api` prefix
-   Module-based architecture (Auth, Projects, Tasks, Categories, Users)
-   Custom guards for authentication and authorization
-   Role-based access control (RBAC) with Owner/Editor/Viewer roles
-   DTO pattern for request/response validation
-   Service layer for business logic
-   Prisma Client for database operations

---

## 📂 Project Structure

### Backend Architecture (NestJS)

```text
backend/
├── prisma/
│   └── schema.prisma          # Prisma database schema
├── src/
│   ├── main.ts                # Application entry point
│   ├── app.module.ts          # Root module
│   ├── auth/                  # Authentication module
│   │   ├── guards/            # JWT and role-based guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── project-role.guard.ts
│   │   │   ├── category-role.guard.ts
│   │   │   └── task-role.guard.ts
│   │   ├── strategies/        # Passport strategies
│   │   │   └── jwt.strategy.ts
│   │   ├── decorators/        # Custom decorators
│   │   │   ├── current-user.decorator.ts
│   │   │   └── require-project-role.decorator.ts
│   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── login.dto.ts
│   │   │   ├── register.dto.ts
│   │   │   └── auth-token.dto.ts
│   │   ├── auth.controller.ts # Auth endpoints
│   │   ├── auth.service.ts    # Auth business logic
│   │   └── auth.module.ts
│   ├── users/                 # User management module
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── projects/              # Project management module
│   │   ├── dto/               # Request/response DTOs
│   │   │   ├── create-project.dto.ts
│   │   │   ├── update-project.dto.ts
│   │   │   ├── assign-project-role.dto.ts
│   │   │   └── revoke-access.dto.ts
│   │   ├── utils/             # Utility functions
│   │   │   └── role-converter.ts
│   │   ├── projects.controller.ts
│   │   ├── projects.service.ts
│   │   └── projects.module.ts
│   ├── categories/            # Category management module
│   │   ├── dto/
│   │   ├── categories.controller.ts
│   │   ├── categories.service.ts
│   │   └── categories.module.ts
│   ├── tasks/                 # Task management module
│   │   ├── dto/
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── database/              # Database service
│   │   ├── database.service.ts # Prisma client wrapper
│   │   └── database.module.ts
│   └── common/                # Shared utilities
│       ├── filters/           # Exception filters
│       │   └── http-exception.filter.ts
│       └── decorators/
└── test/                      # E2E tests
```

### Frontend Architecture (React)

```text
frontend/
├── public/                    # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── api.ts                 # Axios instance configuration
│   ├── App.tsx                # Root component with routing
│   ├── index.tsx              # Entry point
│   ├── theme.ts               # Material-UI theme
│   ├── components/            # Shared components
│   │   ├── layouts/
│   │   │   └── MainLayout.tsx # Main app layout
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── GlassButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── Scrollbar.ts
│   │   ├── AppHeader.tsx      # Top navigation bar
│   │   ├── SideMenu.tsx       # Project sidebar
│   │   ├── EditBox.tsx        # Inline editing component
│   │   └── RoleChip.tsx       # Role badge component
│   ├── features/              # Feature modules (domain-driven)
│   │   ├── auth/
│   │   │   ├── api/           # Auth API calls
│   │   │   │   └── authApi.ts
│   │   │   ├── components/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── context/       # Auth context
│   │   │   │   └── AuthContext.tsx
│   │   │   ├── hooks/         # Auth custom hooks
│   │   │   │   ├── useAuth.ts
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegister.ts
│   │   │   └── types/         # Zod schemas
│   │   │       └── authSchemas.ts
│   │   ├── projects/
│   │   │   ├── api/projectApi.ts
│   │   │   ├── components/
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── ProjectDetails.tsx
│   │   │   │   ├── ProjectsPanel.tsx
│   │   │   │   └── ProjectMembersDialog.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProjects.ts
│   │   │   │   ├── useProjectDetails.ts
│   │   │   │   ├── useCreateProject.ts
│   │   │   │   ├── useUpdateProject.ts
│   │   │   │   ├── useDeleteProject.ts
│   │   │   │   ├── useGrantAccess.ts
│   │   │   │   └── useRevokeAccess.ts
│   │   │   └── types/projectSchemas.ts
│   │   ├── categories/
│   │   │   ├── api/categoryApi.ts
│   │   │   ├── components/
│   │   │   │   ├── CategoryView.tsx
│   │   │   │   ├── CategoriesView.tsx
│   │   │   │   └── CreateCategoryDialog.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useCategories.ts
│   │   │   │   ├── useCreateCategory.ts
│   │   │   │   ├── useUpdateCategory.ts
│   │   │   │   ├── useDeleteCategory.ts
│   │   │   │   └── useReorderCategory.ts
│   │   │   └── types/categoriesSchemas.ts
│   │   ├── tasks/
│   │   │   ├── api/taskApi.ts
│   │   │   ├── components/
│   │   │   │   ├── TaskView.tsx
│   │   │   │   ├── TasksView.tsx
│   │   │   │   ├── CreateTaskDialog.tsx
│   │   │   │   └── UpdateTaskDialog.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useTasks.ts
│   │   │   │   ├── useCreateTask.ts
│   │   │   │   ├── useUpdateTask.ts
│   │   │   │   ├── useDeleteTask.ts
│   │   │   │   └── useMoveTask.ts
│   │   │   └── types/taskSchemas.ts
│   │   └── users/
│   │       ├── api/userApi.ts
│   │       ├── components/
│   │       │   ├── UserProfile.tsx
│   │       │   └── SearchUserDialog.tsx
│   │       ├── hooks/
│   │       │   ├── useUserProfile.ts
│   │       │   └── useSearchUsers.ts
│   │       └── types/userSchemas.ts
│   ├── hooks/                 # Global custom hooks
│   │   ├── useDebounce.ts     # Debounce hook
│   │   ├── useApi.ts          # API error handling
│   │   └── useRoleColor.ts    # Role color mapping
│   ├── pages/                 # Page components
│   │   ├── LoginPage.tsx
│   │   └── RegisterPage.tsx
│   └── types/                 # Global TypeScript types
│       ├── projectRoles.tsx   # Role enums
│       ├── errorResponseDto.ts
│       └── react-query.d.ts
├── package.json
└── tsconfig.json
```

---

## 🏗️ Architecture & Code Details

### Backend Architecture (NestJS + Prisma)

#### **Implementation Pattern**

-   **Models**: Defined in Prisma schema (`prisma/schema.prisma`)
-   **Controllers**: Handle HTTP requests and route to services
-   **Services**: Contain business logic and database operations
-   **Guards**: Implement authentication and authorization
-   **DTOs**: Define request/response data structures with validation

#### **Key Backend Components**

##### **1. Authentication System**

**JWT Strategy** (`auth/strategies/jwt.strategy.ts`):

```typescript
// Validates JWT tokens and extracts user information
async validate(payload: JwtPayload) {
    return {
        userId: payload.sub,      // User ID from token
        name: payload.firstname,  // User's first name
        email: payload.email      // User's email
    };
}
```

**Auth Controller** (`auth/auth.controller.ts`):

```typescript
@Controller("api/auth")
export class AuthController {
    // POST /api/auth/login - User login
    @Post("login")
    async login(@Body() loginDto: LoginDto) {
        // Validates credentials and returns JWT token
        return this.authService.login(loginDto);
    }

    // POST /api/auth/register - User registration
    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        // Creates new user with hashed password
        return this.authService.register(registerDto);
    }
}
```

**Auth Service** (`auth/auth.service.ts`):

```typescript
async login(loginDto: LoginDto) {
    // 1. Find user by email
    const user = await this.db.user.findUnique({
        where: { email: loginDto.email }
    });

    // 2. Verify password using bcrypt
    const passwordMatch = await bcrypt.compare(
        loginDto.password,
        user.password
    );

    // 3. Generate JWT token with user data
    return {
        token: this.jwtService.sign({
            sub: user.id,
            name: user.firstname,
            email: user.email
        })
    };
}
```

##### **2. Role-Based Access Control (RBAC)**

**Project Role Guard** (`auth/guards/project-role.guard.ts`):

```typescript
@Injectable()
export class ProjectRoleGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        // 1. Get required roles from decorator
        const requiredRoles = this.reflector.get<Role[]>('roles', ...);

        // 2. Extract project ID and user from request
        const projectId = request.params.id;
        const user = request.user;

        // 3. Check user's membership in the project
        const membership = await this.db.projectMembership.findUnique({
            where: { projectId_userId: { projectId, userId: user.userId }}
        });

        // 4. Verify role hierarchy (OWNER > EDITOR > VIEWER)
        const roleHierarchy = {
            [Role.OWNER]: 3,
            [Role.EDITOR]: 2,
            [Role.VIEWER]: 1
        };

        return userRoleLevel >= minRequiredLevel;
    }
}
```

**Usage in Controllers**:

```typescript
// Only project OWNER can delete projects
@Delete(':id')
@UseGuards(ProjectRoleGuard)
@RequireProjectRole(Role.OWNER)
remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
}

// EDITOR and OWNER can update projects
@Patch(':id')
@UseGuards(ProjectRoleGuard)
@RequireProjectRole(Role.EDITOR)
update(@Param('id') id: string, @Body() updateDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateDto);
}
```

##### **3. Projects Module**

**Projects Controller** (`projects/projects.controller.ts`):

```typescript
@Controller("api/projects")
@UseGuards(JwtAuthGuard) // All routes require authentication
export class ProjectsController {
    // POST /api/projects - Create new project
    @Post()
    create(@Body() createDto: CreateProjectDto, @CurrentUser() user: any) {
        // Automatically assigns creator as OWNER
        return this.projectsService.create(createDto, user.userId);
    }

    // GET /api/projects - Get user's projects
    @Get()
    findAll(@CurrentUser() user: any) {
        // Returns all projects where user is a member
        return this.projectsService.findAll(user.userId);
    }

    // PUT /api/projects/:id/assign - Assign role to user
    @Put(":id/assign")
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.OWNER) // Only OWNER can assign roles
    assignRole(@Param("id") id: string, @Body() assignDto: AssignProjectRoleDto, @CurrentUser() user: any) {
        return this.projectsService.assignRole(id, assignDto, user.userId);
    }
}
```

**Projects Service** (`projects/projects.service.ts`):

```typescript
async create(createProjectDto: CreateProjectDto, userId: string) {
    // Creates project with automatic OWNER membership
    const project = await this.db.project.create({
        data: {
            name: createProjectDto.name,
            memberships: {
                create: {
                    userId,
                    role: Role.OWNER  // Creator becomes OWNER
                }
            }
        }
    });

    return {
        ...project,
        role: convertRoleToFrontend(Role.OWNER)  // Convert to frontend format
    };
}

async findAll(userId: string) {
    // Gets all project memberships for user
    const memberships = await this.db.projectMembership.findMany({
        where: { userId },
        include: { project: true }
    });

    // Maps to projects with role information
    return memberships.map(membership => ({
        ...membership.project,
        role: convertRoleToFrontend(membership.role)
    }));
}
```

##### **4. Role Conversion Utility**

**Purpose**: Converts between Prisma enum format and frontend format

**Role Converter** (`projects/utils/role-converter.ts`):

```typescript
// Prisma uses UPPERCASE: OWNER, EDITOR, VIEWER
// Frontend uses PascalCase: Owner, Editor, Viewer

export function convertRoleToFrontend(role: Role): string {
    const roleMap = {
        [Role.OWNER]: "Owner",
        [Role.EDITOR]: "Editor",
        [Role.VIEWER]: "Viewer",
    };
    return roleMap[role];
}

export function convertRoleFromFrontend(role: string): Role {
    const roleMap = {
        Owner: Role.OWNER,
        Editor: Role.EDITOR,
        Viewer: Role.VIEWER,
    };
    return roleMap[role] || role;
}
```

**DTO with Transformation** (`projects/dto/assign-project-role.dto.ts`):

```typescript
export class AssignProjectRoleDto {
    @IsUUID()
    userId: string;

    @Transform(({ value }) => convertRoleFromFrontend(value))
    @IsEnum(Role)
    role: Role;
}
```

##### **5. Database Service**

**Prisma Client Wrapper** (`database/database.service.ts`):

```typescript
@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: { url: process.env.DATABASE_URL },
            },
        });
    }

    // Provides type-safe database access
    // Example: this.db.project.create(...)
}
```

---

### Frontend Architecture (React + TypeScript)

#### **State Management Strategy**

Zenith uses **TanStack Query (React Query)** for server state management with these patterns:

##### **1. Custom Hooks Pattern**

**Project Hooks** (`features/projects/hooks/useProjects.ts`):

```typescript
export const useProjects = () => {
    const query = useQuery({
        queryKey: projectKeys.list(),
        queryFn: projectApi.getAll,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });

    // Automatically separates owned vs shared projects
    const { userProjects, sharedProjects } = useMemo(() => {
        return {
            userProjects: query.data?.filter((p) => p.role === "Owner") ?? [],
            sharedProjects: query.data?.filter((p) => p.role !== "Owner") ?? [],
        };
    }, [query.data]);

    return { ...query, userProjects, sharedProjects };
};
```

##### **2. Optimistic Updates**

**Update Project Hook** (`features/projects/hooks/useUpdateProject.ts`):

```typescript
export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: projectApi.update,

        // Optimistic update - UI updates immediately
        onMutate: async (variables) => {
            await queryClient.cancelQueries({ queryKey: projectKeys.detail(variables.id) });

            const previousProject = queryClient.getQueryData(projectKeys.detail(variables.id));

            // Update cache immediately
            queryClient.setQueryData(projectKeys.detail(variables.id), (old) => ({ ...old, ...variables }));

            return { previousProject };
        },

        // Rollback on error
        onError: (err, variables, context) => {
            if (context?.previousProject) {
                queryClient.setQueryData(projectKeys.detail(variables.id), context.previousProject);
            }
        },

        // Refetch on success to ensure consistency
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: projectKeys.detail(variables.id),
            });
        },
    });
};
```

##### **3. Form Validation with Zod**

**Project Schema** (`features/projects/types/projectSchemas.ts`):

```typescript
import { z } from "zod";
import { ProjectRole } from "../../../types/projectRoles";

// Schema defines validation rules
export const ProjectSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "Project name is required"),
    role: z.nativeEnum(ProjectRole),
});

export const CreateProjectSchema = ProjectSchema.pick({ name: true });

// TypeScript types generated from schemas
export type ProjectDto = z.infer<typeof ProjectSchema>;
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
```

**Form Component** (`features/projects/components/CreateProjectDialog.tsx`):

```typescript
const form = useForm<CreateProjectDto>({
    resolver: zodResolver(CreateProjectSchema),
    defaultValues: { name: "" },
});

const createProject = useCreateProject();

const onSubmit = (data: CreateProjectDto) => {
    createProject.mutate(data, {
        onSuccess: () => {
            enqueueSnackbar("Project created successfully", { variant: "success" });
            form.reset();
        },
        onError: (error) => {
            enqueueSnackbar(error.message, { variant: "error" });
        },
    });
};
```

##### **4. Drag & Drop Implementation**

**Categories View** (`features/categories/components/CategoriesView.tsx`):

```typescript
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (type === "CATEGORY") {
        // Reorder categories
        const reordered = reorder(categories, source.index, destination.index);

        // Optimistically update UI
        setCategories(reordered);

        // Send request to backend
        reorderCategory.mutate({
            categoryId: result.draggableId,
            newOrder: destination.index,
        });
    } else if (type === "TASK") {
        // Move task between categories
        moveTask.mutate({
            taskId: result.draggableId,
            categoryId: destination.droppableId,
            order: destination.index,
        });
    }
};

return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="categories" type="CATEGORY">
            {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {categories.map((category, index) => (
                        <Draggable key={category.id} draggableId={category.id} index={index}>
                            {(provided) => (
                                <CategoryView
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    category={category}
                                />
                            )}
                        </Draggable>
                    ))}
                </div>
            )}
        </Droppable>
    </DragDropContext>
);
```

##### **5. Authentication Context**

**Auth Context** (`features/auth/context/AuthContext.tsx`):

```typescript
export const AuthProvider: React.FC = ({ children }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("authToken"));

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("authToken", newToken);
        // Axios interceptor automatically adds token to requests
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("authToken");
        queryClient.clear(); // Clear all cached data
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};
```

**Axios Interceptor** (`api.ts`):

```typescript
// Automatically adds auth token to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Automatically handles 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Redirect to login
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
```

---

## 📸 Application Screenshots & Usage

### 🔐 Login Screen

![Login Screen](./screenshots/login_screen.png)

The login interface features a modern glass morphism design with:

-   **Email and password authentication**
-   **Form validation** - Real-time error messages for invalid inputs
-   **JWT token-based authentication** - Secure session management
-   **Remember me functionality** - Persistent login sessions
-   **Registration link** - Easy access to create new account
-   **Responsive design** - Works seamlessly on all devices

### 📊 Project Dashboard

![Dashboard View](./screenshots/dashboard.png)

The main dashboard provides a comprehensive overview of your projects:

-   **My Projects section** - Projects you own (full control)
-   **Shared Projects section** - Projects where you're a member
-   **Role badges** - Visual indicators showing your role (Owner/Editor/Viewer)
-   **Project statistics** - Quick view of tasks and progress
-   **Create project button** - Quickly add new projects
-   **Search functionality** - Filter projects by name
-   **Project cards** - Click to access full project details

### 📝 Kanban Board with Drag & Drop

![Kanban Drag & Drop](./screenshots/kanban_drag.png)

The intuitive Kanban board interface allows seamless task management:

-   **Drag & Drop functionality** - Reorder tasks within categories or move between them
-   **Multiple categories** - Organize tasks into custom columns (To Do, In Progress, Done, etc.)
-   **Task cards** - Display task title, description, and status
-   **Category management** - Add, rename, or delete categories
-   **Empty states** - Helpful messages when categories have no tasks

### ✏️ Task Editing

![Edit Task Dialog](./screenshots/edit_task.png)

The task editing dialog provides comprehensive task management:

-   **Task details form** - Edit title, description, and other metadata
-   **Category selection** - Move tasks between categories via dropdown
-   **Status toggle** - Mark tasks as complete or incomplete
-   **Form validation** - Ensures all required fields are filled
-   **Save/Cancel actions** - Confirm or discard changes
-   **Real-time validation** - Instant feedback on input errors
-   **Optimistic updates** - UI updates immediately, rolls back on error
-   **Accessible modal** - Keyboard navigation and screen reader support

### Key User Experience Features

✨ **Visual Design:**

-   Modern glass morphism aesthetic with subtle transparency
-   Consistent color scheme with role-based color coding
-   Smooth animations and transitions
-   Material Design principles

🚀 **Performance:**

-   Optimistic UI updates for instant feedback
-   Automatic rollback on server errors
-   Efficient state management with TanStack Query
-   Lazy loading and code splitting

📱 **Responsive Design:**

-   Adapts to desktop, tablet, and mobile screens
-   Touch-friendly drag & drop on mobile devices

🔔 **User Feedback:**

-   Toast notifications for all actions (success, error, info)
-   Loading spinners during async operations
-   Error messages with actionable solutions

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

### 📋 System Requirements

Before installing Zenith, ensure your computer has the following software installed:

#### **Required (Docker Method - Recommended):**

-   **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/)
    -   Includes Docker Engine and Docker Compose
    -   Minimum version: Docker 20.10+, Docker Compose 2.0+
    -   Windows: Requires WSL2 (Windows Subsystem for Linux)
    -   macOS: 10.15 or later
    -   Linux: Any modern distribution
-   **Git** - [Download here](https://git-scm.com/downloads)
    -   For cloning the repository

#### **Required (Local Development Method):**

-   **Node.js 18+** - [Download here](https://nodejs.org/)
    -   Includes npm package manager
    -   Recommended: Node.js 20 LTS or later
-   **PostgreSQL 14+** - [Download here](https://www.postgresql.org/download/)
    -   Database server must be running
-   **Git** - [Download here](https://git-scm.com/downloads)

#### **Optional Tools:**

-   **Visual Studio Code** - [Download here](https://code.visualstudio.com/)
    -   Recommended IDE with TypeScript support
-   **Postman** - For API testing
-   **PgAdmin** - Database management GUI (included in Docker setup)

---

### 🐳 Quick Start with Docker (Recommended)

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
