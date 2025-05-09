# Stage 1: Build the application
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json)
COPY package.json package-lock.json ./
COPY prisma ./prisma/

# Install dependencies using npm
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Nuxt 3 project
RUN npm run build

# Generate Prisma client
RUN npm exec prisma generate

# Stage 2: Create the final, optimized image
FROM node:22-alpine # Using a smaller base image is a common optimization

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules # You might be able to optimize this further depending on your dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

# Expose the port that the application will run on
EXPOSE 3000

# Command to start the Nuxt 3 application
CMD [ "npm", "run", "start" ]
