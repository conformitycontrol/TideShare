# install correct node
FROM node:18 AS builder

# create correct directory
WORKDIR /app

# make sure to include dependancies
COPY package*.json ./
COPY .env .env
# install all the included dependancies
RUN npm install

# copy directory into image directory
COPY . .

# Build 
RUN npm run build

# Use lightweight Node.js image for production
FROM node:18-alpine

# create correct directory
WORKDIR /app

# Copy build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Install production dependancies
RUN npm install --only=production

# make sure development environment can run on default port
EXPOSE 3000

# start development environment
CMD ["npm", "start"]