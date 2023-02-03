# Orbit Web Client

## Description
Orbit is a messaging platform designed from the ground up to be fully private, customizable and secure.

Its main goal is anonymity: everything is stored in a manner that doesn't allow it to be viewed after it has been stored in our database.


## Requirments
- [NodeJS](https://nodejs.org/en/download/)
- NPM

## Gettings the sources
Download a zipped version [here](https://github.com/Nova-Studios-Ltd/Orbit-Web/archive/refs/heads/master.zip)
or clone via HTTPS:
```
git clone https://github.com/Nova-Studios-Ltd/Orbit-Web.git
```

## Running/Building
Note: If you wish to use your own instance of the API change API_DOMAIN and WEBSOCKET_DOMAIN in vars.ts in the src of the project

Run:
```
cd orbit-web
npm install
npm start
```
The client will then be available at http://localhost:3000/

Build:
```
cd orbit-web
npm install
npm build
```
Then host with your choice of web server (The offical uses Apache2, with some custom rewrite rules)

# Questions:
Q: Will there be a Docker image?

A: I plan to package the API, SQL Database, and Client into a easy to setup docker image

## Roadmap
[Trello board](https://trello.com/b/txTutVEp/web-nova-chat-3-orbit)

## Contributing
We are open to people contributing, we will have better defined guidelines later on!

## License
The project is currently licensed under a GPLv3 license

## Project status
Development is on going! Please be aware that both me (Nova1545) and my collegue (GentlyTech) currently work or are in school full time, so updates and changes maybe be slow at times
