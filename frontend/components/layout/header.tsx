"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiClient, type User } from "@/lib/api";

export function Header() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await apiClient.getCurrentUser();
      setCurrentUser(user);
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      setCurrentUser(null);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/posts" className="text-2xl font-bold hover:opacity-80 transition-opacity">
          DevHub
        </Link>
        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="w-20 h-9 bg-muted animate-pulse rounded-md" />
          ) : currentUser ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {currentUser.username}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </div>
      </div>
    </header>
  );
}

