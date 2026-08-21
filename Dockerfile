FROM node:20-alpine

WORKDIR /app

# Копируем все файлы сайта
COPY index.html styles.css config.js script.js server.js ./

ENV PORT=3000
EXPOSE 3000

# Чистый Node — никаких npm install, никаких внешних пакетов
CMD ["node", "server.js"]
