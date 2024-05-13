FROM node:latest 

WORKDIR /app 

COPY package*.json .

RUN npm install

COPY . . 

EXPOSE 3005

VOLUME [ "/app/node_modules" ]

CMD ["node", "index.js"] 