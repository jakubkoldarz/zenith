FROM node:18
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma Client from schema
RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]