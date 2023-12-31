FROM node:18

WORKDIR /usr/src/app

COPY . .
COPY .env.example ./.env
RUN npm install
RUN npm run build
CMD ["npm", "start"]
