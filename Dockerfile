FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build app/dist/talk-take-teach/browser /usr/share/nginx/html

EXPOSE 80

# commands to build and run the docker image
# docker build -t talk-take-teach:latest .
# docker run -d -p 4200:80 talk-take-teach:latest
