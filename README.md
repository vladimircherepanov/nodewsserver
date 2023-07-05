Websocket battleship server

Description

Your task is to implement battleship game backend using websocket.

Player interface for your battleship backend is here. You should clone or copy this repository and write the code there.

The backend should be able to do the following:

Start websocket server
Handle websocket connection
Handle player requests
Handle room requests
Handle ships requests
Handle game requests
Create single play bot (optional)
Technical requirements

Task can be implemented on Javascript or Typescript
Use 18 LTS version of Node.js
Only ws, cross-env, typescript, ts-node, ts-node-dev, nodemon, dotenv, eslint and its plugins, webpack and its plugins, prettier, @types/* and testing tools (for example, Jest, Mocha, AVA, Jasmine, Cypress, Storybook, Puppeteer) are allowed
The program is started by npm script start in following way:
All requests and responses must be sent as JSON string
npm run start
After starting the program displays websocket parameters
After program work finished the program should end websocket work correctly
After each received command program should display the command and result
The backend should have 3 types of response:

personal response
reg - player registration/login
response for the game room
create_game - game id and enemy id
start_game - informationa about game and player's ships positions
turn - who is shooting now
attack - coordinates of shot and status
finish - id of the winner
response for all
update_room - list of rooms and players in rooms
update_winners - send score table to players
Game description

We should have inmemory DB with player data (login and password) storage
Player can create game room or connect to the game room after login
Player room data (players, game board, ships positions) storages in the server
Game starts after 2 players are connected to the room and sent ships positions to the server
Server sends move order
Players should shoot in their's turn
Server send back shot result
If player hits or kills the ship, player should make one more shoot
Player wins if he have killed all enemies ships
