FROM harbor-test.haier.net/paas/nginx:1.15.8
COPY build /usr/share/nginx/html/tb
COPY prometheus-react.conf /etc/nginx/conf.d