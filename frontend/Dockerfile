FROM node:20-alpine

WORKDIR /frontend

COPY ./package.json .

COPY ./package-lock.json .

# Configurar npm para usar certificados de confianza
RUN npm config set strict-ssl false

RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
