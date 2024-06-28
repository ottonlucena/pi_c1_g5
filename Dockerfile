# Usa una imagen base con Node.js
FROM node:16-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala las dependencias
RUN pnpm install --frozen-lockfile

# Compila la aplicación
RUN pnpm run build

# Configura el servidor para servir la aplicación
RUN npm install -g serve
CMD ["serve", "-s", "build"]

# Expone el puerto
EXPOSE 3000
