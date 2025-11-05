import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  serializeUser(user: any, done: (err: any, id?: any) => void) {
    // Store only user ID in session
    done(null, user.id);
  }

  async deserializeUser(
    id: string,
    done: (err: any, user?: any) => void,
  ) {
    try {
      // Fetch user from database using ID from session
      const user = await this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          username: true,
          email: true,
          avatarUrl: true,
          bio: true,
          location: true,
          githubUrl: true,
          linkedinUrl: true,
          websiteUrl: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return done(null, null);
      }

      // Return user object (will be stored in req.user)
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}

