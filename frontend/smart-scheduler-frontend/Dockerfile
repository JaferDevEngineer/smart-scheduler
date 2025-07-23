# Step 1: Build the React app
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Remove default Nginx static file config
RUN rm -rf /usr/share/nginx/html/*

# Copy built React files from builder
COPY --from=builder /app/build /usr/share/nginx/html

# Optional: custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
