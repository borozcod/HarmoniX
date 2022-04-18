# Set node as the image
FROM node:16.14.2-alpine

# Set where the working directory is
WORKDIR /app

# Add dependency descriptions
COPY ./package.json ./
COPY ./package-lock.json ./

# install dependencies
RUN npm install

COPY . .

# Start the node app
CMD ["npm", "run", "dev"]