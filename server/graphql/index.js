const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('../data')

const port = 8080;
const private_key = fs.readFileSync(path.join(__dirname, '../keys/jwtRS256.key'), 'utf8')
const public_key = fs.readFileSync(path.join(__dirname, '../keys/jwtRS256.key.pub') , 'utf8')

const app = express();
app.use(
    cors(),
    bodyParser.json(), 
    expressJwt({ 
        algorithms: ['RS256'], 
        secret: public_key,
        credentialsRequired: false
    }).unless({path: ['/login']})
)

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, 'schemas'), { extensions: ['graphql']}))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, 'resolvers'), { extensions: ['js']}))
const context = ({ req }) => ({ user: req.user && db.users.get(req.user.sub)})
const apolloServer = new ApolloServer({ typeDefs, resolvers, context });
apolloServer.applyMiddleware({ app, path: '/graphql'});

app.post('/login', (req, res) => {
    const {email, password} = req.body;
    const user = db.users.list().find((user) => user.email === email);
    if (!(user && user.password === password)) {
      res.sendStatus(401);
      return;
    }
    const token = jwt.sign({sub: user.id}, private_key, { algorithm: 'RS256'});
    res.send({token});
});  

app.listen(port, () => console.info(`Server started on port ${port}`));