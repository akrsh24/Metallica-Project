import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {
  tradeQueries,
  tradeMutations,
  deleteMutations
} from './trades/trades';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...tradeQueries,
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...tradeMutations,
      ...deleteMutations
    }),
  }),
});