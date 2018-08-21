import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  TradeType,
  TradeInputType,
} from './tradesTypes';

import TradeModel from '../../models/trade';

const tradeQueries = {
  trades: {
    type: new GraphQLList(TradeType),
    resolve: function () {
      const tradePromise = new Promise((resolve, reject) => {
        TradeModel.find().exec(function (err, docs) {
          const trade = docs;
          resolve(trade);
        });
      });
      const trades = tradePromise.then((result) => {
        return result;
      });
      return trades;
    }
  }
}

const tradeMutations = {
  createTrade: {
    type: TradeType,
    args: {
      input: {
        type: new GraphQLNonNull(TradeInputType),
      },
    },
    resolve: async (root, { input }) => {
      const tModel = new TradeModel(input);
      const newTrade = tModel.save();
      if (!newTrade) {
        throw new Error('Error');
      }
      return newTrade;
    }
  }
};

const deleteMutations = {
  deleteTrade: {
    type: TradeType,
    args: {
        idd : {
            name : 'idd',
            type : new GraphQLNonNull(GraphQLString)
        } 
    },
    resolve:
      async (root, params) => {
        const removeduser = TradeModel.findOneAndDelete(params.idd).exec();
        if (!removeduser) {
          throw new Error('Error')
        }
        return removeduser;
      }
  }
};


export {
  tradeQueries,
  tradeMutations,
  deleteMutations
};