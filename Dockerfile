FROM node:latest as build

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@17

RUN npm install

COPY . .

RUN ng build --configuration=production

FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build app/dist/talk-take-teach/browser /usr/share/nginx/html

EXPOSE 80


# docker build -t talk-take-teach:latest .
# docker run -d -p 4200:80 talktaketeach
