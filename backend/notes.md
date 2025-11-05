- Password super user postgres: admin / secret

- Migrate: npx prisma migrate dev --name init

- Seed data: docker-compose exec backend npx ts-node backend/prisma/seed.ts
