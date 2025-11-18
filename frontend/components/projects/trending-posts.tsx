"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

interface TrendingPostsProps {
  projects: Project[];
}

export function TrendingPosts({ projects }: TrendingPostsProps) {
  const router = useRouter();

  // Sort by bookmarks + comments count (trending)
  const trending = [...projects]
    .sort((a, b) => {
      const aScore = (a._count?.bookmarks || 0) + (a._count?.comments || 0);
      const bScore = (b._count?.bookmarks || 0) + (b._count?.comments || 0);
      return bScore - aScore;
    })
    .slice(0, 5);

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Trending Posts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {trending.map((project, index) => {
          const score = (project._count?.bookmarks || 0) + (project._count?.comments || 0);
          return (
            <Link
              key={project.id}
              href={`/posts/${project.id}`}
              className="block group"
            >
              <div className="flex gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors">
                <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>
                {project.thumbnailUrl && (
                  <div className="relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{project.author?.username}</span>
                    <span>•</span>
                    <span>{score} interactions</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}

