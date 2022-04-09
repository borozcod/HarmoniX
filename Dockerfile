# Set node as the image
FROM node:16.14.2-alpine

# Set where the working directory is
WORKDIR /app

# Add dependency descriptions
COPY ./client/package.json /app
COPY ./client/package-lock.json /app
# install dependencies
RUN npm install

# Copy the files from my disk to the container
COPY ./client /app

# Start the react app
CMD ["npm", "start"]
