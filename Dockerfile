# Stage 1: Build the application
FROM node:22-bookworm-slim AS builder

WORKDIR /app

# Install pnpm globally using Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema. This is needed before installing dependencies
# if Prisma generate is part of a postinstall script or if you generate early.
# If your Prisma schema is in a different location, adjust the path.
COPY prisma ./prisma/

# Install ALL dependencies (including devDependencies)
# --frozen-lockfile ensures we use the exact versions from the lockfile
# pnpm will automatically run `prisma generate` if it's in a `postinstall` script
# in `package.json` for `@prisma/client`.
# If not, you might need to run it explicitly here.
RUN pnpm install --frozen-lockfile

# If Prisma client generation is NOT part of a postinstall hook for @prisma/client,
# or you need to ensure it runs with all devDependencies available:
# RUN pnpm exec prisma generate
# (Often, `pnpm install` handles this automatically if `@prisma/client` is a dependency)

# Copy the rest of the application code
# This includes Nuxt config, tsconfig, components, pages, server, etc.
COPY . .

# Build the Nuxt 3 project. This uses the generated Prisma client if your code imports it.
RUN pnpm run build
# At this point, `.output` directory is created.

# Prune development dependencies AFTER the build.
# This step creates a cleaner node_modules for the next stage if we were to copy it.
# However, for the final stage, we'll reinstall prod dependencies from scratch on Alpine for compatibility.
# So this step is more for optimizing the builder cache layer or if you were to copy node_modules directly.
# For this specific flow, it might be optional if the final stage re-installs cleanly.
RUN pnpm prune --prod

# Stage 2: Create the final, optimized image
# Use an Alpine-based image for a smaller final size
FROM node:22-alpine AS final

ENV NODE_ENV=production

WORKDIR /app

# Install pnpm globally in the final stage as well (needed for pnpm run start)
# Also, pnpm is needed for `pnpm install --prod`
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package.json, pnpm-lock.yaml, and Prisma schema
# These are needed to install production dependencies and for Prisma client generation on Alpine.
COPY --chown=nuxtjs:nodejs package.json pnpm-lock.yaml ./
COPY --chown=nuxtjs:nodejs prisma ./prisma/
# If you only need schema.prisma for runtime generation:
# COPY --chown=nuxtjs:nodejs prisma/schema.prisma ./prisma/schema.prisma

# Install ONLY production dependencies.
# Prisma Client's `postinstall` script should run `prisma generate` again,
# this time creating binaries compatible with Alpine Linux.
# This is crucial if your builder stage OS (Debian) differs from the final stage OS (Alpine).
RUN pnpm install --prod --frozen-lockfile

# Copy the built application artifacts from the builder stage
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output

# Copy public assets if they are not already included in .output/public by the build
# Nuxt 3 build typically places static assets from `public` directory into `.output/public`
# COPY --from=builder --chown=nuxtjs:nodejs /app/public ./public

# Copy node_modules from builder stage (specifically the .prisma/client if `pnpm install --prod` didn't regenerate it correctly).
# This is an ALTERNATIVE if the `pnpm install --prod` in this stage fails to regenerate the Prisma client for Alpine.
# It's generally better to let `pnpm install --prod` handle it by having `schema.prisma` available.
# If you need this, ensure `prisma generate` in the builder stage produced compatible binaries or only JS code.
# COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the application will run on
EXPOSE 3000

# Command to start the Nuxt 3 application
# This should use the start script defined in your package.json,
# which typically runs `node .output/server/index.mjs` for Nuxt 3.
CMD [ "pnpm", "run", "start" ]
