# install correct node
FROM node:18-alpine

# create correct directory
WORKDIR app/

# make sure to include dependancies
COPY package*.json ./

# install all the included dependancies
RUN npm install

# copy directory into image directory
COPY . .

# make sure development environment can run on default port
EXPOSE 3000

# start development environment
CMD npm run dev