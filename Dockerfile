# Use a lightweight Node.js image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install necessary system tools
RUN apt-get update && \
    apt-get install -y ca-certificates && \
    apt-get clean

# Copy your certificate and update trusted certs
COPY d1irpg7po1rqdm.cloudfront.net.crt /usr/local/share/ca-certificates/
RUN update-ca-certificates

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port your app runs on
EXPOSE 3001

# Set the environment variable for the port
ENV PORT=3001

# Command to run the application
CMD ["npm", "start"]
