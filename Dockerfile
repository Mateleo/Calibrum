# Stage 1: Build the application
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml .npmrc ./
COPY prisma ./prisma/

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Nuxt 3 project
RUN pnpm run build

# Generate Prisma client
RUN pnpm exec prisma generate

# Stage 2: Create the final, optimized image
FROM node:22

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary files from the builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma
# COPY --from=builder /app/generated ./generated

# Expose the port that the application will run on
EXPOSE 3000

# Command to start the Nuxt 3 application
CMD [ "pnpm", "run", "start" ]
