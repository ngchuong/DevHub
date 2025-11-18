"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient, type Project, type Comment, type User } from "@/lib/api";
import { mockProjects } from "@/lib/mock-data";
import { ProjectDetails } from "@/components/projects/project-details";
import { CommentsSection } from "@/components/projects/comments-section";
import { Button } from "@/components/ui/button";

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const projectId = params.id as string;

    const [project, setProject] = useState<Project | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectId]);

    useEffect(() => {
        // Scroll to comments section if hash is present
        if (window.location.hash === "#comments") {
            setTimeout(() => {
                const element = document.getElementById("comments");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        }
    }, [project]);

    const loadData = async () => {
        try {
            setIsLoading(true);

            // Load project
            try {
                const projectData = await apiClient.getProject(projectId);
                setProject(projectData);
            } catch {
                // Use mock data if API not available
                const mockProject = mockProjects.find((p) => p.id === projectId);
                if (mockProject) {
                    setProject(mockProject);
                } else {
                    setError("Project not found");
                    return;
                }
            }

            // Load comments
            try {
                const commentsData = await apiClient.getProjectComments(projectId);
                setComments(commentsData);
            } catch {
                // Use empty array if API not available
                setComments([]);
            }

            // Try to get current user
            try {
                const user = await apiClient.getCurrentUser();
                setCurrentUser(user);
            } catch {
                setCurrentUser(null);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Failed to load data";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCommentAdded = (newComment: Comment) => {
        setComments([...comments, newComment]);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8">
                <div className="text-center py-12">
                    <p className="text-destructive mb-4">{error || "Project not found"}</p>
                    <Button onClick={() => router.push("/posts")}>Back to Posts</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-background">
            <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 xl:px-16 py-8">
                {/* Header - Title and Description */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => router.push("/posts")}
                        className="mb-4"
                    >
                        ← Back to Posts
                    </Button>
                    <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="flex gap-8">
                    {/* Main Content */}
                    <div className="flex-1 min-w-0">
                        <ProjectDetails project={project} isAuthenticated={!!currentUser} />
                        <div id="comments" className="mt-8 scroll-mt-8">
                            <CommentsSection
                                projectId={project.id}
                                comments={comments}
                                currentUser={currentUser}
                                onCommentAdded={handleCommentAdded}
                            />
                        </div>
                    </div>

                    {/* Sidebar - Empty for now, can add related posts later */}
                    <aside className="hidden lg:block w-80 shrink-0" />
                </div>
            </div>
        </div>
    );
}

