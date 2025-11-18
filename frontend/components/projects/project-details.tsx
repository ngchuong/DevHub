"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "./bookmark-button";
import { CommentButton } from "./comment-button";
import { apiClient, type Project } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface ProjectDetailsProps {
  project: Project;
  isAuthenticated: boolean;
}

export function ProjectDetails({ project, isAuthenticated }: ProjectDetailsProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      const result = await apiClient.toggleBookmark(project.id);
      setIsBookmarked(result.bookmarked);
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  };

  return (
    <Card>
      {project.thumbnailUrl && (
        <div className="relative w-full h-64 md:h-96 bg-muted">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-2xl mb-4">{project.title}</CardTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <BookmarkButton
              projectId={project.id}
              isBookmarked={isBookmarked}
              onToggle={handleBookmark}
              disabled={!isAuthenticated}
            />
            <CommentButton
              projectId={project.id}
              commentCount={project._count?.comments || 0}
              disabled={!isAuthenticated}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Author Info */}
        <div className="flex items-center gap-4 pb-4 border-b">
          {project.author?.avatarUrl && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
              <Image
                src={project.author.avatarUrl}
                alt={project.author.username}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          )}
          <div className="flex-1">
            <p className="font-semibold">{project.author?.username || "Unknown"}</p>
            {project.author?.bio && (
              <p className="text-sm text-muted-foreground">{project.author.bio}</p>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>

        {/* Project Links */}
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                View on GitHub
              </Link>
            </Button>
          )}
          {project.demoUrl && (
            <Button variant="outline" asChild>
              <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View Demo
              </Link>
            </Button>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 pt-4 border-t text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>{project._count?.comments || 0} comments</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
            <span>{project._count?.bookmarks || 0} bookmarks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

