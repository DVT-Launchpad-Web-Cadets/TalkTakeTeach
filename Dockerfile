FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@17

RUN npm install

COPY . .

RUN npm run build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# RUN mkdir -p /var/log/nginx

COPY --from=build app/dist/talk-take-teach/browser /usr/share/nginx/html

EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

# commands to build and run the docker image
# docker build -t talk-take-teach:latest .
# docker run -d -p 4200:80 talk-take-teach:latest
