"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface BookmarkButtonProps {
  projectId: string;
  isBookmarked: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function BookmarkButton({
  isBookmarked,
  onToggle,
  disabled,
}: BookmarkButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) {
      router.push("/login");
      return;
    }
    onToggle();
  };

  return (
    <Button
      variant={isBookmarked ? "default" : "outline"}
      size="icon"
      onClick={handleClick}
      disabled={disabled}
      title={isBookmarked ? "Remove bookmark" : "Bookmark"}
    >
      <svg
        className="h-4 w-4"
        fill={isBookmarked ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
    </Button>
  );
}

