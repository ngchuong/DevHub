# Development Dockerfile
FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .

ENV PORT=3000
EXPOSE 3000

# Default command (can be overridden by docker-compose)
CMD ["yarn", "start:dev"]
