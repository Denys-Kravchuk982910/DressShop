FROM node:18-alpine
WORKDIR .
COPY . .
RUN npm ci 
RUN npm run build
ENV NODE_ENV release
EXPOSE 3000
CMD ["npx", "serve", "-s", "build" ]