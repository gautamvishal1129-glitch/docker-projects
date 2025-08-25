FROM nginx:alpine

# Clear default files
RUN rm -rf /usr/share/nginx/html/*

# Copy everything inside public/
COPY public/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
