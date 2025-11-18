# DevHub Frontend

Frontend application for DevHub built with Next.js, TypeScript, Tailwind CSS, and Radix UI.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Component variants
- **clsx & tailwind-merge** - Class name utilities

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Build the application for production:

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
frontend/
├── app/              # Next.js app directory
│   ├── layout.tsx   # Root layout
│   ├── page.tsx     # Home page
│   └── globals.css  # Global styles
├── components/      # React components
│   └── ui/         # UI components (Button, Card, etc.)
├── lib/            # Utility functions
│   └── utils.ts    # Utility functions (cn, etc.)
└── public/         # Static assets
```

## Available Components

- **Button** - Versatile button component with multiple variants
- **Card** - Card component for content containers
- **Input** - Input field component
- **Label** - Label component for form fields
- **Separator** - Separator component for visual division

More Radix UI components can be added as needed.

## Authentication

The application includes a login/signup page at `/login` with:
- Email/password authentication
- OAuth buttons for GitHub and Google (UI ready, backend integration pending)
- Form validation
- Error handling
- Session-based authentication

### API Configuration

Set the backend API URL using environment variables:

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The default API URL is `http://localhost:3000`.

## Docker

Build and run with Docker:

```bash
docker build -t devhub-frontend .
docker run -p 3001:3001 devhub-frontend
```
