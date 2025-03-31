# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY . /app/
# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/zone-critique/browser /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80