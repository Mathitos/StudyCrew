FROM node

USER node

ENV PORT 1337
# ENV APP_ID someappid
# ENV MASTER_KEY somemasterkey
# ENV DATABASE_URI mongodb://mongo/studycrew

ENV PARSE_HOME /home/node/parse-server

RUN mkdir -p ${PARSE_HOME}
ADD ./package.json ${PARSE_HOME}
ADD ./index.js ${PARSE_HOME}

ENV CLOUD_CODE_HOME ${PARSE_HOME}/cloud
RUN mkdir -p ${CLOUD_CODE_HOME}
ADD cloud/*.js ${CLOUD_CODE_HOME}/

WORKDIR ${PARSE_HOME}

RUN npm install

EXPOSE ${PORT}
VOLUME ${CLOUD_CODE_HOME}

CMD [ "npm", "start" ]