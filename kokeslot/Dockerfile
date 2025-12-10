# Stage 1: Build the Angular app
FROM node:22-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código
COPY . .

# Construir la app
RUN npm run build --prod

# Stage 2: Servir con Nginx
FROM nginx:alpine

# Copiar la build al directorio de Nginx
COPY --from=build /app/dist/kokeslot /usr/share/nginx/html

# Copiar configuración de Nginx si quieres personalizar
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
