# Use the official Nginx image from the Docker Hub
FROM nginx:alpine

COPY icons /usr/share/nginx/html/icons
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]

# Run the container
# docker build -t best-to-buy .
# docker run -d -p 800:80 --name best-to-buy best-to-buy
# docker tag best-to-buy:latest ariessurya/best-to-buy:latest
# docker push ariessurya/best-to-buy:latest