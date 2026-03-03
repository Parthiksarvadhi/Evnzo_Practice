# Evnzo Backend Folder Structure

This document explains the architecture and purpose of every folder and configuration in the Evnzo Backend project. The project follows a **Layered & Modular Architecture** tailored for scalable Node.js/TypeScript enterprise applications.

## 📂 Root Directory

- **`node_modules/`**: Contains all installed dependencies.
- **`prisma/`**: 
  - Contains `schema.prisma`. This is the single source of truth for the database structure and the Prisma ORM configuration.
  - Also contains database migrations and seed scripts.
- **`scripts/`**: Utility scripts for development (e.g., custom build commands).
- **`docs/`**: Documentation files for the API or general project knowledge.
- **`src/`**: The core application source code. (Detailed below)
- **`.env` / `.env.example`**: Environment variables (secrets, database URLs, ports).
- **`package.json`**: Lists dependencies, standardizes scripts (like `dev`, `build`, `lint`), and holds basic project metadata.
- **`tsconfig.json` & `tsconfig.build.json`**: Strict TypeScript configuration rules instructing the compiler on how to transform TypeScript into production-ready JavaScript.
- **`.eslintrc.cjs` & `eslint.config.cjs`**: ESLint configuration to enforce code quality and styling consistency.
- **`.prettierrc`**: Prettier formatting rules.
- **`. husky/`**: Git hooks (like checking code before allowing a `git commit`).

---

## 📂 Inside `src/` (The Core Source Code)

The `src` directory is strictly organized into domains and operational layers.

### 🔹 App Entry & Initialization
- **`index.ts`**: The main entry point. It creates the HTTP server, connects to the database, and listens to the designated port.
- **`app.ts`**: Configures the main Express application. It registers global security middlewares, the root router, and the final global error handler.

### 🔹 `src/config/` (Environment Management)
- Validates and exports environment variables. Instead of calling `process.env` randomly throughout the app, the variables are securely parsed here so the app crashes early if something critical is missing.

### 🔹 `src/constant/` (Magic Strings & Enums)
- Stores all hardcoded constants like API endpoint paths (`endPoints.constant.ts`), response messages (`message.constant.ts`), and error types. This prevents "magic strings" and makes refactoring easy.

### 🔹 `src/db/` (Database Connection)
- Initializes and exports the `PrismaClient` singleton. This guarantees the entire application uses a single connection pool, avoiding database crashes.

### 🔹 `src/logger/` (Structured Logging)
- Configures `winston` for robust logging. Replaces basic `console.log` with formatted, structured logs (useful for monitoring tools and debugging production).

### 🔹 `src/middleware/` (Request Interceptors)
- Code that executes *between* the incoming request and the business logic:
  - **`auth.ts`**: Validates JWTs to protect private routes.
  - **`security.ts`**: Adds HTTP headers (like helmet) to prevent common web attacks.
  - **`validation.ts`**: Uses `zod` to validate incoming payload structures (`req.body`).
  - **`errorHandler.ts`**: A global safety net catching unhandled exceptions.

### 🔹 `src/utils/` (Helper Utilities)
- Independent, reusable functions:
  - **`appError.ts`**: Custom Error classes for clean HTTP status code propagation.
  - **`handleResponse.ts`**: A unified formatter so every API response has the exact same structure (success/error, data, message).
  - **`jwt.ts`**: Utilities to encode/decode user session tokens.

### 🔹 `src/types/` (TypeScript Definitions)
- Global TypeScript interfaces and type overrides (e.g., extending the Express `Request` object to include user data).

### 🔹 `src/routes/` (Main Request Dispatcher)
- Receptions all incoming HTTP requests and directs them to the correct feature module.
  - **`index.ts`**: Mounts feature routers onto specific URL prefixes (e.g., `/api/v1/user` points to the `userRouter`). It’s critical for API versioning.

---

## 📂 `src/modules/` (Feature Modules - The Business Logic)

The project organizes its core logic by **feature** (e.g., Auth, User) instead of file type. Each module cleanly separates concerns using the Controller-Service-Repository pattern:

- **`*.routes.ts`**:
  - Defines the HTTP methods (GET, POST).
  - Attaches module-specific middlewares (like validation guards).
  - Passes the request to the Controller.
- **`*.controller.ts`**:
  - The HTTP layer.
  - Extracts parameters or body payloads.
  - Calls the Service and returns standard JSON using `handleApiResponse`.
- **`*.service.ts`**:
  - **The Business Logic Layer.** 
  - Handles password hashing, data formatting, external API calls, and orchestrates the database interactions.
- **`*.repository.ts`**:
  - **The Data Access Layer.**
  - Strictly interacts with the database (via Prisma). Keeps database queries out of the business logic.

---

### Why this architecture?
This structure is an enterprise-grade pattern designed for massive scale. If the framework changes, the business logic (`Service`) remains untouched. If the database changes, only the `Repository` needs rewriting. It prevents "spaghetti code" and allows large teams to collaborate seamlessly.
