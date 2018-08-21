import {
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

const TradeType = new GraphQLObjectType({
  name: 'TradeType',
  description: 'User type definition',
  fields: () => ({
    idd: {
      type: GraphQLID,
    },
    commodity: {
      type: GraphQLString,
    },
    side: {
      type: GraphQLString,
    },
    counterparty: {
      type: GraphQLString,
    },
    price: {
      type: GraphQLInt,
    },
    quantity: {
      type: GraphQLInt,
    },
    location: {
      type: GraphQLString,
    },
  }),
});

const TradeInputType = new GraphQLInputObjectType({
  name: 'TradeInputType',
  description: 'User payload definition',
  fields: () => ({
    idd: {
      type: new GraphQLNonNull(GraphQLID),
    },
    commodity: {
      type: new GraphQLNonNull(GraphQLString),
    },
    side: {
      type: new GraphQLNonNull(GraphQLString),
    },
    counterparty: {
      type: new GraphQLNonNull(GraphQLString),
    },
    price: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    location: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export {
  TradeType,
  TradeInputType,
};