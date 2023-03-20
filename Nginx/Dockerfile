FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/server.crt /etc/nginx/ssl/server.crt
COPY ./ssl/server.key /etc/nginx/ssl/server.key
EXPOSE 80 
EXPOSE 443