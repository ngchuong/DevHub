import { type Project, type User } from "./api";

export const mockUsers: User[] = [
  {
    id: "user1",
    username: "johndoe",
    email: "john@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Full-stack developer passionate about React and Node.js",
    location: "San Francisco, CA",
    githubUrl: "https://github.com/johndoe",
    linkedinUrl: "https://linkedin.com/in/johndoe",
    websiteUrl: "https://johndoe.dev",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "user2",
    username: "janedoe",
    email: "jane@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    bio: "UI/UX Designer & Frontend Developer",
    location: "New York, NY",
    githubUrl: "https://github.com/janedoe",
    linkedinUrl: null,
    websiteUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "user3",
    username: "devmaster",
    email: "dev@example.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev",
    bio: "Backend engineer specializing in microservices",
    location: "Austin, TX",
    githubUrl: "https://github.com/devmaster",
    linkedinUrl: "https://linkedin.com/in/devmaster",
    websiteUrl: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockProjects: Project[] = [
  {
    id: "project1",
    title: "E-Commerce Platform with Next.js",
    description:
      "A modern e-commerce platform built with Next.js 14, TypeScript, and Tailwind CSS. Features include product catalog, shopping cart, payment integration, and admin dashboard.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/johndoe/ecommerce-platform",
    demoUrl: "https://ecommerce-demo.vercel.app",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "Prisma"],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[0].id,
    author: mockUsers[0],
    _count: {
      comments: 12,
      bookmarks: 45,
    },
  },
  {
    id: "project2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with React and Node.js.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/janedoe/task-manager",
    demoUrl: "https://taskmanager-demo.vercel.app",
    techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[1].id,
    author: mockUsers[1],
    _count: {
      comments: 8,
      bookmarks: 32,
    },
  },
  {
    id: "project3",
    title: "Microservices API Gateway",
    description:
      "A scalable API gateway for microservices architecture with rate limiting, authentication, and request routing. Built with NestJS and Redis.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/devmaster/api-gateway",
    demoUrl: null,
    techStack: ["NestJS", "TypeScript", "Redis", "Docker", "Kubernetes"],
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[2].id,
    author: mockUsers[2],
    _count: {
      comments: 15,
      bookmarks: 67,
    },
  },
  {
    id: "project4",
    title: "Social Media Dashboard",
    description:
      "A comprehensive social media analytics dashboard with real-time metrics, engagement tracking, and content scheduling. Built with Vue.js and Python.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/johndoe/social-dashboard",
    demoUrl: "https://social-dashboard-demo.vercel.app",
    techStack: ["Vue.js", "Python", "FastAPI", "PostgreSQL", "Chart.js"],
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[0].id,
    author: mockUsers[0],
    _count: {
      comments: 6,
      bookmarks: 28,
    },
  },
  {
    id: "project5",
    title: "AI-Powered Code Review Tool",
    description:
      "An intelligent code review tool that uses AI to analyze code quality, suggest improvements, and detect potential bugs. Built with React and TensorFlow.js.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/janedoe/ai-code-review",
    demoUrl: null,
    techStack: ["React", "TensorFlow.js", "TypeScript", "Node.js", "MongoDB"],
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[1].id,
    author: mockUsers[1],
    _count: {
      comments: 23,
      bookmarks: 89,
    },
  },
  {
    id: "project6",
    title: "Real-time Chat Application",
    description:
      "A real-time chat application with end-to-end encryption, file sharing, and video call support. Built with React, Node.js, and WebRTC.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    githubUrl: "https://github.com/devmaster/chat-app",
    demoUrl: "https://chat-app-demo.vercel.app",
    techStack: ["React", "Node.js", "Socket.io", "WebRTC", "PostgreSQL"],
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    authorId: mockUsers[2].id,
    author: mockUsers[2],
    _count: {
      comments: 18,
      bookmarks: 54,
    },
  },
];

