# FROM node:18.4.0-alpine
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .

# Creates a "dist" folder with the production build (if applicable)
# RUN yarn build

# Specify the default command to run your application
# CMD ["yarn", "start"]

FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get install -y nodejs

RUN apt-get update 
RUN npm install -g yarn

WORKDIR /app
COPY . .

# RUN npm install --legacy-peer-deps
RUN yarn install --ignore-optional
RUN yarn add swc
