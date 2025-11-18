"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "./bookmark-button";
import { CommentButton } from "./comment-button";
import { apiClient, type Project } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  isAuthenticated: boolean;
}

export function ProjectCard({ project, isAuthenticated }: ProjectCardProps) {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleViewProject = () => {
    router.push(`/posts/${project.id}`);
  };

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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {project.thumbnailUrl && (
        <div className="relative w-full h-48 bg-muted">
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
        <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {project.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack?.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
            >
              {tech}
            </span>
          ))}
          {project.techStack && project.techStack.length > 4 && (
            <span className="px-2 py-1 text-xs text-muted-foreground">
              +{project.techStack.length - 4} more
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>By {project.author?.username || "Unknown"}</span>
          <span>•</span>
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleViewProject}
        >
          View Project
        </Button>
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
      </CardFooter>
    </Card>
  );
}

