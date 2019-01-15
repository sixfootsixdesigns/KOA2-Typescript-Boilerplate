FROM node:10

# Specify the PATH for node_modules to get picked up correctly
ENV PATH /app:/data/node_modules/.bin:$PATH
ENV NODE_PATH=/app:/data/node_modules

COPY package.json yarn.lock /data/
WORKDIR /data
RUN yarn install

# Make a symlink for the mounted /app directory so that ts-node is able to pickup the
# typings from node_modules
RUN ln -s /data/app /app
RUN ln -s /data/app/node_modules /data/node_modules

WORKDIR /app
