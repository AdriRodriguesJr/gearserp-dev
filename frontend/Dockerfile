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

# Cria o arquivo de configuração do Nginx diretamente
RUN echo 'events { \n\
    worker_connections 1024; \n\
} \n\
\n\
http { \n\
    include /etc/nginx/mime.types; \n\
    sendfile on; \n\
\n\
    proxy_connect_timeout 60s; \n\
    proxy_send_timeout 60s; \n\
    proxy_read_timeout 60s; \n\
\n\
    proxy_buffers 8 16k; \n\
    proxy_buffer_size 32k; \n\
\n\
    server { \n\
        listen 80; \n\
        server_name desenvolvimento.gearserp.space; \n\
        root /usr/share/nginx/html; \n\
        index index.html; \n\
\n\
        location / { \n\
            try_files $uri $uri/ /index.html; \n\
            add_header Cache-Control "no-cache"; \n\
        } \n\
\n\
        location /api/ { \n\
            proxy_pass http://erp-backend:3000/; \n\
            proxy_http_version 1.1; \n\
            proxy_set_header Upgrade $http_upgrade; \n\
            proxy_set_header Connection '\''upgrade'\''; \n\
            proxy_set_header Host $host; \n\
            proxy_set_header X-Real-IP $remote_addr; \n\
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \n\
            proxy_set_header X-Forwarded-Proto $scheme; \n\
\n\
            add_header '\''Access-Control-Allow-Origin'\'' '\''*'\'' always; \n\
            add_header '\''Access-Control-Allow-Methods'\'' '\''GET, POST, OPTIONS, PUT, DELETE'\'' always; \n\
            add_header '\''Access-Control-Allow-Headers'\'' '\''DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization'\'' always; \n\
\n\
            if ($request_method = '\''OPTIONS'\'') { \n\
                add_header '\''Access-Control-Allow-Origin'\'' '\''*'\''; \n\
                add_header '\''Access-Control-Allow-Methods'\'' '\''GET, POST, OPTIONS, PUT, DELETE'\''; \n\
                add_header '\''Access-Control-Allow-Headers'\'' '\''DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization'\''; \n\
                add_header '\''Access-Control-Max-Age'\'' 1728000; \n\
                add_header '\''Content-Type'\'' '\''text/plain; charset=utf-8'\''; \n\
                add_header '\''Content-Length'\'' 0; \n\
                return 204; \n\
            } \n\
        } \n\
\n\
        location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|otf|svg)$ { \n\
            expires 6M; \n\
            access_log off; \n\
            add_header Cache-Control "public, max-age=15552000"; \n\
            try_files $uri =404; \n\
        } \n\
\n\
        error_page 404 /index.html; \n\
        error_page 502 503 504 /index.html; \n\
\n\
        access_log /var/log/nginx/access.log combined buffer=512k flush=1m; \n\
        error_log /var/log/nginx/error.log warn; \n\
    } \n\
}' > /etc/nginx/nginx.conf

EXPOSE 80

# Mantém o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]