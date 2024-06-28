# Usa una imagen base con Node.js
FROM node:16-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo de bloqueo y el package.json antes de copiar el resto de los archivos
COPY pnpm-lock.yaml .
COPY package.json .

# Instala pnpm
RUN npm install -g pnpm

# Instala las dependencias usando el archivo de bloqueo
RUN pnpm install --frozen-lockfile

# Copia el resto de los archivos del proyecto
COPY . .

# Compila la aplicación
RUN pnpm run build

# Instala el servidor 'serve' globalmente
RUN npm install -g serve

# Configura el servidor para servir la aplicación
CMD ["serve", "-s", "build"]

# Expone el puerto
EXPOSE 3000
