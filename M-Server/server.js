import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import mongoose from './config/mongoose';
import schema from './server/graphql/schema'

const db=mongoose();
const app = express();
app.use('*', cors({ origin: 'http://localhost:3000' }));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: global,
  graphiql: true,
  endpointURL: '/graphql'
}));

app.use('/', (req, res) => {
  res.json('Go to /graphql to test your queries and mutations!');
});

app.listen(process.env.PORT || 2007, () => {
  console.log('A GraphQL API running at port 2007');
});