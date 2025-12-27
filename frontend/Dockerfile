# frontend/Dockerfile

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
EXPOSE 3000
CMD ["npm", "start"]
