# Use official Node.js image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock / pnpm-lock.yaml)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app (NestJS compiles TypeScript)
RUN npm run build

# Expose the port NestJS runs on
EXPOSE 3000

# Set the command to run the app
CMD ["npm", "run", "start:prod"]