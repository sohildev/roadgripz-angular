# # 1. Build our Angular app
# FROM node:14.15.4 as build-step
# RUN mkdir -p /app
# WORKDIR /app
# COPY package.json package-lock.json ./
# # RUN npm cache clean
# RUN npm ci
# COPY . .
# RUN npm run build -- --prod --output-path=/dist

# # 2. Deploy our Angular app to NGINX
# FROM nginx:alpine
# ## Replace the default nginx index page with our Angular app
# RUN rm -rf /usr/share/nginx/html/*
# COPY --from=build-step /dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# ENTRYPOINT ["nginx", "-g", "daemon off;"]
# Other Way To Build Docker
FROM nginx:alpine
COPY /dist/roadgripz-angular /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf