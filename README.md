# Dog Store Frontend

This is a dog store Ecommerce project built with Next.js 15 for the frontend, featuring complete authentication system with NextAuth.js.

## Tech Stack

- **Next.js 15** with App Router and Turbopack
- **React 19** 
- **TypeScript 5**
- **Tailwind CSS 4** with PostCSS
- **NextAuth.js 4** for authentication
- **React Hook Form** with Zod validation
- **Axios** for API calls

## Project Structure

```
├── .env.local.example          # Environment variables template
├── .env.local                  # Environment variables (create from example)
├── middleware.ts               # Route protection middleware
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tailwind.config.js
├── CLAUDE.md                   # Claude Code configuration
├── README.md
├── app/
│   ├── layout.tsx              # Root layout with AuthProvider
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles with Tailwind
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts    # NextAuth API routes
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx        # Sign in page
│   │   ├── signup/
│   │   │   └── page.tsx        # Sign up page
│   │   └── error/
│   │       └── page.tsx        # Authentication error page
│   └── dashboard/
│       └── page.tsx            # Protected dashboard page
├── components/
│   ├── auth/
│   │   ├── signin-form.tsx     # Sign in form component
│   │   └── signup-form.tsx     # Sign up form component
│   └── providers/
│       └── auth-provider.tsx   # NextAuth SessionProvider wrapper
├── lib/
│   ├── auth/
│   │   ├── auth-options.ts     # NextAuth configuration
│   │   └── auth-api.ts         # Authentication API functions
│   ├── actions/
│   │   └── auth-actions.ts     # Server actions for auth
│   ├── validations/
│   │   └── auth.ts             # Zod validation schemas
│   └── axios/
│       └── axios-auth.ts       # Axios instance with auth interceptors
├── types/
│   └── auth.ts                 # TypeScript type definitions
├── hooks/
│   └── use-auth.ts             # Custom authentication hook
└── public/
    └── favicon.ico
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your values:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Generate a NextAuth secret:
```bash
openssl rand -base64 32
```

### 3. Run Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production application with Turbopack  
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Authentication Features

- **User Registration & Login** with form validation
- **JWT-based Sessions** with NextAuth.js
- **Protected Routes** via middleware
- **Token Refresh** handling
- **Type-safe** authentication throughout
- **Server Actions** for form handling
- **Professional UI** with loading states and error handling

## API Integration

The app is configured to work with a backend API at `NEXT_PUBLIC_API_URL`. Authentication endpoints expected:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration  
- `POST /auth/refresh` - Token refresh

## Development

The project uses:
- **App Router** architecture
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Geist fonts** for typography
