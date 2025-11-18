"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { apiClient, type Comment, type User } from "@/lib/api";
import Image from "next/image";

interface CommentsSectionProps {
  projectId: string;
  comments: Comment[];
  currentUser: User | null;
  onCommentAdded: (comment: Comment) => void;
}

export function CommentsSection({
  projectId,
  comments,
  currentUser,
  onCommentAdded,
}: CommentsSectionProps) {
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      router.push("/login");
      return;
    }

    if (!commentText.trim()) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const newComment = await apiClient.createComment({
        content: commentText.trim(),
        projectId,
      });
      setCommentText("");
      onCommentAdded(newComment);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to post comment";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Form */}
        {currentUser ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
              className="resize-none"
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button type="submit" disabled={isSubmitting || !commentText.trim()}>
              {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
          </form>
        ) : (
          <div className="p-4 bg-muted rounded-md text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Please login to leave a comment
            </p>
            <Button variant="outline" onClick={() => router.push("/login")}>
              Login
            </Button>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4 pb-4 border-b last:border-0">
                {comment.author?.avatarUrl && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={comment.author.avatarUrl}
                      alt={comment.author.username}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">
                      {comment.author?.username || "Unknown"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

