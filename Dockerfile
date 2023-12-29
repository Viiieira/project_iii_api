FROM node:18-alpine

# Create app directory
WORKDIR /app

COPY package*.json ./

RUN npm install

# Install nodemon globally
RUN npm install -g nodemon

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["nodemon"]