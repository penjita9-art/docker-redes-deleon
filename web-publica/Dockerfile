FROM node:22-alpine

WORKDIR /app

# Definimos el puerto por defecto en el entorno del contenedor
ENV PORT=3000

COPY server.js .

# Expone el puerto dinámicamente usando la variable (buena práctica informativa)
EXPOSE 3000

CMD ["node", "server.js"]
