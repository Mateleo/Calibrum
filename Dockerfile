# Stage 1: Build the application
FROM node:24-slim AS builder


# Set the working directory
WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable pnpm

# Copy package management files
COPY package.json pnpm-lock.yaml .npmrc ./

# Copy Prisma schema (needed for installation/generation)
COPY prisma ./prisma/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Generate Prisma client
RUN pnpm exec prisma generate

# Build the Nuxt 3 project
RUN pnpm run build

# Stage 2: Create the final, optimized image
FROM node:24-slim AS runner


# Set the working directory
WORKDIR /app

COPY --from=builder --chown=node:node /app/.output ./.output
COPY --from=builder --chown=node:node /app/data ./data
COPY --from=builder --chown=node:node /app/prisma ./prisma

# Expose the port that the application will run on
EXPOSE 3000

# Health check (Good practice for container orchestration)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Command to start the Nuxt 3 application directly with Node
CMD [ "node", ".output/server/index.mjs" ]