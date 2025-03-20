FROM harbor.host.com/public/openresty:1.19.9.1-2-centos7

COPY dist/ /usr/share/nginx/html/
COPY nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
