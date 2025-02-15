# Etapa 1: Construção do frontend (React/Vite)
FROM node:22 AS builder

WORKDIR /app

# Copia apenas os arquivos necessários para o build
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Configuração do Nginx para servir o frontend
FROM nginx:latest

# Copia os arquivos do build do frontend para a pasta padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# Mantém o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
