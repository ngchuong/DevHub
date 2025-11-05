export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  avatarUrl: string | null;
  bio: string | null;
  location: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  websiteUrl: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Exclude password from response
  constructor(user: any) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.avatarUrl = user.avatarUrl;
    this.bio = user.bio;
    this.location = user.location;
    this.githubUrl = user.githubUrl;
    this.linkedinUrl = user.linkedinUrl;
    this.websiteUrl = user.websiteUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
