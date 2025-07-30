FROM node:20-alpine

WORKDIR /frontend

# Instalar certificados raíz actualizados y utilidades necesarias
RUN apk add --no-cache ca-certificates curl && update-ca-certificates

# Copiar archivos de dependencias
COPY ./package.json .
COPY ./package-lock.json .

# (Ya no necesitas desactivar strict-ssl si tienes los certificados actualizados)
RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

EXPOSE 3000

CMD ["npm", "start"]


# FROM node:20-alpine

# WORKDIR /frontend

# COPY ./package.json .

# COPY ./package-lock.json .

# Configurar npm para usar certificados de confianza
# RUN npm config set strict-ssl false

# RUN npm config set registry https://registry.npmjs.org/

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
