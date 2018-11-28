import {
  GraphQLSchema,
  GraphQLObjectType,
} from 'graphql';

import {
  tradeQueries,
  tradeMutations,
  deleteMutations,
  searchQuery,
  updateMutations
} from './trades/trades';


export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...tradeQueries,
      ...searchQuery
    }),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...tradeMutations,
      ...deleteMutations,
      ...updateMutations
    }),
  }),
});