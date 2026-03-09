# 1. Etapa de compilación
# Usamos Node 20 (LTS) que es la versión empresarial más segura
FROM mcr.microsoft.com/devcontainers/javascript-node:20-bookworm AS build

# ACTUALIZACIÓN DE SEGURIDAD: Esto parcha vulnerabilidades del sistema operativo Alpine
RUN apk update && apk upgrade --no-cache

WORKDIR /app

# Copiamos solo los archivos de dependencias primero (mejor para la caché de Docker)
COPY package*.json ./
RUN npm install

# Copiamos el resto del código y construimos
COPY . .
RUN npm run build

# 2. Etapa de Producción (Cambiamos Alpine por Debian Slim para 0 vulnerabilidades)
FROM nginx:mainline-bookworm-slim

# Copiamos los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Copiamos una configuración de nginx si la tienes, o usamos la default
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]