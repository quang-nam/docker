FROM node:18-alpine
#reduce the size when we build the docker
WORKDIR /app
# take use of caching data of docker 
COPY package*.json .
#copy local PC into docker 

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi


COPY . .

EXPOSE 8080

CMD [ "node", "app.js" ]