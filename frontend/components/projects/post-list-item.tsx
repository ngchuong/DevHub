"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkButton } from "./bookmark-button";
import { CommentButton } from "./comment-button";
import { apiClient, type Project } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface PostListItemProps {
  project: Project;
  isAuthenticated: boolean;
}

export function PostListItem({ project, isAuthenticated }: PostListItemProps) {
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
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        {project.thumbnailUrl && (
          <div className="relative w-full md:w-64 h-48 md:h-auto bg-muted flex-shrink-0">
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <CardContent className="flex-1 p-6">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <Link
                  href={`/posts/${project.id}`}
                  className="text-xl font-semibold hover:text-primary transition-colors mb-2 block"
                >
                  {project.title}
                </Link>
                <p className="text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.slice(0, 5).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack && project.techStack.length > 5 && (
                    <span className="px-2 py-1 text-xs text-muted-foreground">
                      +{project.techStack.length - 5} more
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {project.author?.username || "Unknown"}</span>
                  <span>•</span>
                  <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewProject}
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}

