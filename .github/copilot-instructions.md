<!-- Copilot instructions for hongsa-power-rtms -->
# Hongsa RTMS — AI coding assistant guidance

This file captures repository-specific patterns and workflows to help AI coding agents be immediately productive.

- **Big picture:** This repository contains small .NET Web APIs under `backend/` and `sampleapi/`.
  - The services use the ASP.NET Core minimal hosting model (`WebApplication.CreateBuilder`) and traditional controllers (see `backend/Program.cs` and `backend/Controllers/*`).
  - `backend` is the primary API: controllers live in `backend/Controllers`, models in `backend/Models`, and configuration in `backend/appsettings*.json`.

- **How the APIs are structured:**
  - Controllers use `[ApiController]` and `Route("api/[controller]")` (example: `backend/Controllers/UserController.cs`).
  - Controllers commonly return `ActionResult<T>` and use helper results (`Ok()`, `NotFound()`, `CreatedAtAction()`, `NoContent()`).
  - Many controllers use in-memory/mock collections (e.g. static `List<User>` in `UserController.cs`) — do not assume a database unless you find one in `Models` or additional services.

- **Docs & dev-time behavior:**
  - OpenAPI/Scalar UI is wired in `backend/Program.cs` and only enabled in Development environment (`app.Environment.IsDevelopment()` calls `MapOpenApi()` and `MapScalarApiReference`).
  - Use `appsettings.Development.json` for local development overrides.

- **Build / run / debug (Windows PowerShell):**
  - Build: `dotnet build ./backend/Hongsa.Rtms.Api.csproj`
  - Run: `dotnet run --project ./backend/Hongsa.Rtms.Api.csproj`
  - When debugging in VS Code use the `Properties/launchSettings.json` process/profile if present.

- **Naming & oddities to watch for:**
  - Some model filenames include non-ASCII characters (example: `backend/Models/๊User.cs`) — refer to the declared namespace and class name rather than relying on filename matching.
  - The project uses a third-party package `Scalar.AspNetCore` (see `Program.cs`) to render API docs; any changes to doc generation should be made there.

- **Patterns & conventions (from code inspection):**
  - Keep controller methods small and use `ActionResult<T>` for flexible HTTP results.
  - Mock data is used in controllers during early development — add persistence carefully and update controllers to use DI services instead of static lists.
  - Configuration values come from `appsettings.json` / `appsettings.Development.json`.

- **When you change behavior / add features:**
  - Update `Program.cs` only for cross-cutting concerns (middleware, OpenAPI, global services). Prefer adding services via `builder.Services` and constructor injection into controllers.
  - If introducing a database layer, add a new folder `Services` or `Data` and register the DB context in `Program.cs` via `builder.Services.AddDbContext<...>()`.

- **Files to inspect for context:**
  - `backend/Program.cs` — minimal host, OpenAPI/Scalar setup.
  - `backend/Controllers/*` — controller patterns and mock data usage.
  - `backend/Models/*` — domain types used by controllers.
  - `backend/appsettings.json`, `backend/appsettings.Development.json` — configuration.
  - `backend/Properties/launchSettings.json` — local debug profiles.

If any section is unclear or you want examples for a specific task (add a controller, integrate a DB, or change OpenAPI settings), tell me which area to expand and I will update this file.
