import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.project.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleared existing data');

  // Create users
  console.log('👥 Creating users...');

  // Hash passwords before storing
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.user.create({
    data: {
      username: 'john_dev',
      email: 'john@example.com',
      password: hashedPassword,
      avatarUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      bio: 'Full-stack developer passionate about React and Node.js',
      location: 'San Francisco, CA',
      githubUrl: 'https://github.com/johndev',
      linkedinUrl: 'https://linkedin.com/in/johndev',
      websiteUrl: 'https://johndev.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'sarah_ui',
      email: 'sarah@example.com',
      password: hashedPassword,
      avatarUrl:
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      bio: 'UI/UX Designer & Frontend Developer',
      location: 'New York, NY',
      githubUrl: 'https://github.com/sarahui',
      linkedinUrl: 'https://linkedin.com/in/sarahui',
      websiteUrl: 'https://sarahdesigns.com',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      username: 'mike_backend',
      email: 'mike@example.com',
      password: hashedPassword,
      avatarUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      bio: 'Backend engineer specializing in microservices',
      location: 'Seattle, WA',
      githubUrl: 'https://github.com/mikebackend',
      linkedinUrl: 'https://linkedin.com/in/mikebackend',
    },
  });

  console.log('✅ Created 3 users');

  // Create projects
  console.log('📁 Creating projects...');
  const project1 = await prisma.project.create({
    data: {
      title: 'E-Commerce Platform',
      description:
        'A modern e-commerce platform built with React, Node.js, and PostgreSQL.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
      githubUrl: 'https://github.com/johndev/ecommerce-platform',
      demoUrl: 'https://ecommerce-demo.johndev.com',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Docker'],
      authorId: user1.id,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      title: 'Task Management App',
      description:
        'A collaborative task management application with real-time updates.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400',
      githubUrl: 'https://github.com/sarahui/task-manager',
      demoUrl: 'https://tasks.sarahdesigns.com',
      techStack: ['Vue.js', 'Express', 'MongoDB', 'Socket.io'],
      authorId: user2.id,
    },
  });

  const project3 = await prisma.project.create({
    data: {
      title: 'Microservices API Gateway',
      description: 'A scalable API gateway for microservices architecture.',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400',
      githubUrl: 'https://github.com/mikebackend/api-gateway',
      techStack: ['Node.js', 'Docker', 'Kubernetes', 'Redis'],
      authorId: user3.id,
    },
  });

  console.log('✅ Created 3 projects');

  // Create follows
  console.log('👥 Creating follow relationships...');
  await prisma.follow.create({
    data: {
      followerId: user1.id,
      followingId: user2.id,
    },
  });

  await prisma.follow.create({
    data: {
      followerId: user2.id,
      followingId: user3.id,
    },
  });

  await prisma.follow.create({
    data: {
      followerId: user3.id,
      followingId: user1.id,
    },
  });

  console.log('✅ Created 3 follow relationships');

  // Create bookmarks
  console.log('🔖 Creating bookmarks...');
  await prisma.bookmark.create({
    data: {
      userId: user1.id,
      projectId: project2.id,
    },
  });

  await prisma.bookmark.create({
    data: {
      userId: user2.id,
      projectId: project3.id,
    },
  });

  await prisma.bookmark.create({
    data: {
      userId: user3.id,
      projectId: project1.id,
    },
  });

  console.log('✅ Created 3 bookmarks');

  // Create comments
  console.log('💬 Creating comments...');
  await prisma.comment.create({
    data: {
      content: 'Amazing project! The UI is so clean and intuitive.',
      authorId: user2.id,
      projectId: project1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Great work on the architecture. Very scalable approach.',
      authorId: user3.id,
      projectId: project1.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Love the attention to detail in the user experience.',
      authorId: user1.id,
      projectId: project2.id,
    },
  });

  await prisma.comment.create({
    data: {
      content: 'Impressive use of modern technologies. Well done!',
      authorId: user1.id,
      projectId: project3.id,
    },
  });

  console.log('✅ Created 4 comments');

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('📊 Summary:');
  console.log('   👥 Users: 3');
  console.log('   📁 Projects: 3');
  console.log('   👥 Follows: 3');
  console.log('   🔖 Bookmarks: 3');
  console.log('   💬 Comments: 4');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
