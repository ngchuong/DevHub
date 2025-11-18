"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CommentButtonProps {
  projectId: string;
  commentCount: number;
  disabled?: boolean;
}

export function CommentButton({
  projectId,
  commentCount,
  disabled,
}: CommentButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) {
      router.push("/login");
      return;
    }
    router.push(`/posts/${projectId}#comments`);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      disabled={disabled}
      title="View comments"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      {commentCount > 0 && (
        <span className="ml-1 text-xs">{commentCount}</span>
      )}
    </Button>
  );
}

