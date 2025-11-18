const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  bio?: string;
  location?: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  message: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  githubUrl: string | null;
  demoUrl: string | null;
  techStack: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: User;
  comments?: Comment[];
  bookmarks?: Bookmark[];
  _count?: {
    comments: number;
    bookmarks: number;
  };
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  projectId: string;
  author: User;
}

export interface Bookmark {
  id: string;
  createdAt: string;
  userId: string;
  projectId: string;
}

export interface CreateCommentDto {
  content: string;
  projectId: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Important for session cookies
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: response.statusText,
      }));
      throw new Error(error.message || "An error occurred");
    }

    return response.json();
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(loginDto),
    });
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    return this.request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(registerDto),
    });
  }

  async logout(): Promise<{ message: string }> {
    return this.request<{ message: string }>("/auth/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<User> {
    return this.request<User>("/auth/me");
  }

  // Projects API (to be implemented in backend)
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>("/projects");
  }

  async getProject(id: string): Promise<Project> {
    return this.request<Project>(`/projects/${id}`);
  }

  // Comments API (to be implemented in backend)
  async getProjectComments(projectId: string): Promise<Comment[]> {
    return this.request<Comment[]>(`/projects/${projectId}/comments`);
  }

  async createComment(commentDto: CreateCommentDto): Promise<Comment> {
    return this.request<Comment>("/comments", {
      method: "POST",
      body: JSON.stringify(commentDto),
    });
  }

  // Bookmarks API (to be implemented in backend)
  async toggleBookmark(projectId: string): Promise<{ bookmarked: boolean }> {
    return this.request<{ bookmarked: boolean }>(`/projects/${projectId}/bookmark`, {
      method: "POST",
    });
  }

  async getBookmarks(): Promise<Bookmark[]> {
    return this.request<Bookmark[]>("/bookmarks");
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
