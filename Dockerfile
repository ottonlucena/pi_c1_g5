# Usa una imagen base con Node.js
FROM node:16-alpine

# Configura el directorio de trabajo
WORKDIR /app

# Copia el archivo de bloqueo y el package.json antes de copiar el resto de los archivos
COPY pnpm-lock.yaml .
COPY package.json .

# Instala las dependencias usando el archivo de bloqueo y habilitando la caché correctamente
RUN --mount=type=cache,id=pnpm-cache,target=/root/.local/share/pnpm/store/v3 pnpm install --frozen-lockfile

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
