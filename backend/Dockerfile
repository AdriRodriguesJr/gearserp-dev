# Usa a imagem oficial do Node.js 22 como base
FROM node:22 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas package.json e package-lock.json para instalar dependências primeiro (melhora cache)
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install --only=production

# Copia todo o código do backend para dentro do container
COPY . .

# Expõe a porta definida para a API
EXPOSE 3000

# Define a variável de ambiente padrão
ENV PORT=3000

# Comando padrão para iniciar a API
CMD ["npm", "start"]
