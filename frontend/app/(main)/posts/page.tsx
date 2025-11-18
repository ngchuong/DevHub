"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PostListItem } from "@/components/projects/post-list-item";
import { TrendingPosts } from "@/components/projects/trending-posts";
import { apiClient, type Project, type User } from "@/lib/api";
import { mockProjects } from "@/lib/mock-data";

export default function PostsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [projects, setProjects] = useState<Project[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);

      // Load projects (public, no auth required)
      try {
        const projectsData = await apiClient.getProjects();
        setProjects(projectsData);
      } catch {
        // If API doesn't exist yet, use mock data
        console.warn("Projects API not available, using mock data");
        setProjects(mockProjects);
      }

      // Try to get current user (optional)
      try {
        const user = await apiClient.getCurrentUser();
        setCurrentUser(user);
      } catch {
        // User not authenticated, that's fine
        setCurrentUser(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to load data";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
      return projects;
    }

    const query = searchQuery.toLowerCase().trim();
    return projects.filter((project) => {
      const titleMatch = project.title.toLowerCase().includes(query);
      const descriptionMatch = project.description.toLowerCase().includes(query);
      const techStackMatch = project.techStack?.some((tech) =>
        tech.toLowerCase().includes(query)
      );
      const authorMatch = project.author?.username.toLowerCase().includes(query);

      return titleMatch || descriptionMatch || techStackMatch || authorMatch;
    });
  }, [projects, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProjects.length === 0
                ? "No projects found"
                : `Found ${filteredProjects.length} project${filteredProjects.length !== 1 ? "s" : ""} for "${searchQuery}"`}
            </p>
          </div>
        )}

        <div className="flex gap-8">
          {/* Main Content - Posts List */}
          <div className="flex-1 min-w-0">
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No projects found. Check back later!
                </p>
              </div>
            ) : filteredProjects.length === 0 && searchQuery ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-2">
                  No projects found matching &quot;{searchQuery}&quot;
                </p>
                <p className="text-sm text-muted-foreground">
                  Try a different search term
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <PostListItem
                    key={project.id}
                    project={project}
                    isAuthenticated={!!currentUser}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Trending Posts */}
          <aside className="hidden lg:block w-80 shrink-0">
            {projects.length > 0 && !searchQuery && (
              <TrendingPosts projects={projects} />
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

