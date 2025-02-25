# Etapa 1: Construção do frontend (React, Vite ou outro)
FROM node:18 AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar o restante do projeto
COPY . .

# Criar o build de produção (ex: React/Vite -> npm run build)
RUN npm run build

# ========================
# Etapa 2: Servindo com Apache
# ========================
FROM httpd:latest

# Copia o build gerado para o diretório padrão do Apache
COPY --from=builder /app/dist/ /usr/local/apache2/htdocs/

# Habilitar mod_rewrite (necessário para SPA fazer roteamento "client-side")
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Criar um .htaccess para redirecionar todas as requisições para index.html
RUN echo '<IfModule mod_rewrite.c>\n\
    RewriteEngine On\n\
    RewriteBase /\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteRule ^ index.html [L]\n\
</IfModule>\n\
\n\
<IfModule mod_headers.c>\n\
    Header set Access-Control-Allow-Origin "*"\n\
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"\n\
    Header set Access-Control-Allow-Headers "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization"\n\
</IfModule>' > /usr/local/apache2/htdocs/.htaccess

# Expõe a porta 80 (já é padrão do httpd, mas não custa deixar explícito)
EXPOSE 80

# Comando default para rodar o Apache em primeiro plano
CMD ["httpd-foreground"]