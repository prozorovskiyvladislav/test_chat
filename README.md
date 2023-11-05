# Chat app
Test chat with React+Redux Saga + websocket
This project is working on Websocket on server side and client side
User has possibility to choose a room and chatting.

# Local Start

For local start you should use this commands:
cd client
npm run start
cd ../
cd server
npm run dev

Project should automatically open http://localhost:3000 on your default browser

# Build

Client has possibility to build on two modes: dev and production.
For dev build use command build:dev.For prod build use build:prod.
Prod build consist plugins which should reduce build size: MiniCssExtractPlugin, CleanWebpackPlugin, TerserPlugin.

# TODO
Way to improvement:
UI/UX design, show when user typing in the chat, rewrite code to Typescript for better typization, allow user to create private chat room and generate link for them.
