# SocialMediaApp

A social media web application built with Angular, where users can create an account, share posts, interact with other users' content, and stay up to date through notifications.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.7.

## Tech Stack

- **[Angular 21](https://angular.dev/)** — standalone components, lazy-loaded routes, signals
- **TypeScript**
- **[RxJS](https://rxjs.dev/)**
- **[Tailwind CSS v4](https://tailwindcss.com/)** — utility-first styling
- **[Flowbite](https://flowbite.com/)** — UI components built on Tailwind
- **[Font Awesome](https://fontawesome.com/)** — icon set
- **[Vitest](https://vitest.dev/)** — unit testing
- **Angular CLI** — build tooling

## Features

- ☑ User registration and login
- ☑ Forget / change password flow
- ☐ Create and publish posts
- ☐ Like and comment on posts
- ☐ Save posts for later
- ☐ Notifications
- ☐ Profile management
- ☐ ...and more

> The project is under active development — features above are checked off as they're implemented.

## Folder Structure

```text
src/
├── app/
│   ├── core/                     # app-wide singletons
│   │   ├── auth/
│   │   │   ├── guards/           # route guards (e.g. auth.guard.ts)
│   │   │   └── services/         # auth.service.ts
│   │   └── interceptors/         # auth.interceptor.ts
│   ├── features/                 # feature/page modules, one folder per domain
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── forget-password/
│   │   │   │   └── change-password/
│   │   │   └── auth.routes.ts
│   │   ├── home/
│   │   ├── profile/
│   │   ├── notifications/
│   │   └── not-found/
│   ├── layout/                   # shell layouts
│   │   ├── auth-layout/
│   │   └── main-layout/
│   ├── shared/                   # reusable, presentational building blocks
│   │   └── components/
│   │       └── atoms/            # smallest UI primitives (button, input-err, ...)
│   ├── app.config.ts
│   ├── app.routes.ts
│   └── app.ts
├── assets/
│   └── styles/
└── index.html
```

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
