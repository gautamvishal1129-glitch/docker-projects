# Use a small, modern Node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install only what's needed to run (layer caching)
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the source
COPY . .

# Document port
EXPOSE 3000

# Default command
CMD ["npm", "start"]
