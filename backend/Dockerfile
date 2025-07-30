FROM node:22-alpine

WORKDIR /backend

COPY package.json .

# Configurar npm para usar certificados de confianza
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

EXPOSE 8001

CMD ["npm", "run", "dev"]
