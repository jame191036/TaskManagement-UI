# Stage 1: Build
FROM node:18 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Run the app
FROM nginx:stable-alpine

# Copy built files from the previous stage to NGINX's web directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
