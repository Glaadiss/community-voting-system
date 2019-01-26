# Community Voting System

[![Build Status](https://travis-ci.com/Glaadiss/community-voting-system.svg?branch=master)](https://travis-ci.com/Glaadiss/community-voting-system)

Community Voting System written with with React.js, Graphql and Prisma

## Getting Started

#### Prerequisites

Things you have to install before:

- docker
- npm / yarn
- prisma via npm `npm install -g prisma`

#### Installing and running

##### prisma server(backend):

```
cd backend
npm install
docker-compose up -d
npm run update
npm run get-schema
npm start
```

##### React (frontend):

```
cd frontend
npm install
npm start
```
