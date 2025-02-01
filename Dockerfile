# Stage 1: Build the application
FROM node:22 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nuxt 3 project
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Stage 2: Create the final, optimized image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Expose the port that the application will run on
EXPOSE 3000

# Command to start the Nuxt 3 application
CMD [ "npm", "run", "start" ]