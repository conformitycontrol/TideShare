# install correct node
FROM node:18 AS builder
ARG DATABASE_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG CLERK_SECRET_KEY
ARG AMAZON_ACCESS_KEY
ARG AMAZON_SECRET_KEY
ARG BUCKET_NAME
ARG REGION

# create correct directory
WORKDIR /app

# make sure to include dependancies
COPY package*.json ./

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