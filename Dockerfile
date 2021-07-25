#Designed to be used as an Ansible node

FROM node:slim
LABEL Rahul Sinha <rahulranjansinha.ju@gmail.com>
VOLUME /app
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 5000
ENTRYPOINT ["npm"]
CMD [ "start" ]