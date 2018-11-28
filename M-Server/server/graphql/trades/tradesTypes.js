import {
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt
} from 'graphql';

import GraphQLDate from 'graphql-date';


const TradeType = new GraphQLObjectType({
  name: 'TradeType',
  description: 'User type definition',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    tdate: {
      type: GraphQLDate,
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
  description: 'Trade payload definition',
  fields: () => ({
    tdate: {
      type: new GraphQLNonNull(GraphQLDate),
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

const SearchInputType = new GraphQLInputObjectType({
  name: 'SearchInputType',
  description: 'Trade payload definition',
  fields: () => ({
    fdate: {
      type: GraphQLString,
    },
    tdate: {  
      type: GraphQLString,
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
    location: {
      type: GraphQLString,
    },
  }),
});

const UpdateInputType = new GraphQLInputObjectType({
  name: 'UpdateInputType',
  description: 'Trade payload definition',
  fields: () => ({
    id: {
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


export {
  TradeType,
  TradeInputType,
  SearchInputType,
  UpdateInputType
};