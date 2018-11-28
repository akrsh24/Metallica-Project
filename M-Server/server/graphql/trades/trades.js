import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} from 'graphql';

import {
  TradeType,
  TradeInputType,
  SearchInputType,
  UpdateInputType,
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

const updateMutations = {
  updateTrade: {
    type: TradeType,
    args: {
      input: {
        type: new GraphQLNonNull(UpdateInputType),
      },
    },
    resolve: async (root, { input }) => {
      return TradeModel.findOneAndUpdate(
        { "id": input.id },
        {
          $set: {
            "commodity": input.commodity,
            "side": input.side,
            "quantity": input.quantity,
            "counterparty": input.counterparty,
            "location": input.location
          }
        },
        { new: true }
      )
        .catch(err => new Error(err));
    }
  }
}


const deleteMutations = {
  deleteTrade: {
    type: TradeType,
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve:
      async (root, params) => {
        const removeduser = TradeModel.findOneAndDelete({ "id": params.id }).exec();
        if (!removeduser) {
          throw new Error('Error')
        }
        return removeduser;
      }
  }
};



const searchQuery = {
  searchTrades: {
    type: new GraphQLList(TradeType),
    args: {
      input: {
        type: SearchInputType,
      },
    },
    resolve: async (root, { input }) => {
      //-------------------a-----------------------------//

      if (input.commodity === 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "counterparty": input.counterparty },
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //-----------------------------------------d--------------------------------
      else if (input.commodity != 'all' && input.side === 'all' && input.location != 'all' && input.counterparty != 'all' && input.fdate != "" && input.tdate != "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "counterparty": input.counterparty },
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //-----------------------b------------------------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "side": input.side },
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //-------------------------c------------------------------------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "side": input.side },
            { "counterparty": input.counterparty },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades

      }

      //----------------------ad---------------------------------------//

      else if (input.commodity === 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "location": input.location },
            { "counterparty": input.counterparty },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //------------------------ac---------------------------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "counterparty": input.counterparty },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades

      }

      //----------------------ab-----------------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades

      }

      //----------------cd------------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "counterparty": input.counterparty },
            { "commodity": input.commodity },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //---------------------bd---------------------------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //----------bc--------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "commodity": input.commodity },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //------------bce----------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "commodity": input.commodity },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }



      //------------abc-------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      ///------------abce-----------------------------------
      else if (input.commodity === 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          "side": input.side
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }


      //---------------acd-----------------------
      else if (input.commodity === 'all' && input.side === 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "counterparty": input.counterparty },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //----------------abd----------------------------
      else if (input.commodity === 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "location": input.location },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //----------bcd---------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //----------------PHI----------------------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "location": input.location },
            { "counterparty": input.counterparty },
            { "side": input.side },
            {
              $and:
                [
                  { "tdate": { $gte: new Date(input.fdate) } },
                  { "tdate": { $lte: new Date(input.tdate) } }
                ]
            },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //-----------------------END-----------------------------------

      //--------------------ae-----------------------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "location": input.location },
            { "counterparty": input.counterparty },
            { "side": input.side },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //----------------------abe----------------------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "location": input.location },
            { "side": input.side },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //---------------------cde------------------------------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //------------------------ace------------------------------------

      else if (input.commodity === 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "side": input.side },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //---------------------------abde---------------------------------------

      else if (input.commodity === 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          "location": input.location,
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //-------------------------------acde----------------------------------------
      else if (input.commodity === 'all' && input.side === 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          "counterparty": input.counterparty
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //--------------------------------be--------------------------------------------------
      else if (input.commodity !== 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "side": input.side },
            { "location": input.location }
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //--------------------------be--------------------------------------------
      // else if (input.commodity !== 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
      //   const trades = TradeModel.find({
      //     $and: [
      //       { "commodity": input.commodity },
      //       { "side": input.side },
      //       { "location": input.location }
      //     ]
      //   }).exec();
      //   if (!trades) {
      //     throw new Error('Error')
      //   }
      //   return trades
      // }

      //--------------------------bde----------------------------------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "location": input.location }
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //-----------------------bcde----------------------------------
      else if (input.commodity !== 'all' && input.side === 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          "commodity": input.commodity
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //----------------------ce------------------------
      else if (input.commodity !== 'all' && input.side !== 'all' && input.location === 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "side": input.side },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //---------------------ade------------------------------------
      else if (input.commodity === 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "location": input.location },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //-------------------------de--------------------------------

      else if (input.commodity !== 'all' && input.side === 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "location": input.location },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //------------------------e---------------------------------

      else if (input.commodity !== 'all' && input.side !== 'all' && input.location !== 'all' && input.counterparty !== 'all' && input.fdate === "" && input.tdate === "") {
        const trades = TradeModel.find({
          $and: [
            { "commodity": input.commodity },
            { "side": input.side },
            { "location": input.location },
            { "counterparty": input.counterparty },
          ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }
      //----------------------------abcd-----------------------------
      else if (input.commodity === 'all' && input.side === 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate !== "" && input.tdate !== "") {
        const trades = TradeModel.find({
          $and:
            [
              { "tdate": { $gte: new Date(input.fdate) } },
              { "tdate": { $lte: new Date(input.tdate) } }
            ]
        }).exec();
        if (!trades) {
          throw new Error('Error')
        }
        return trades
      }

      //-------------------------abcde---------------------------------

      else if (input.commodity === 'all' && input.side === 'all' && input.location === 'all' && input.counterparty === 'all' && input.fdate === "" && input.tdate === "") {
        const tradePromise = new Promise((resolve, reject) => {
          TradeModel.find().exec(function (err, docs) {
            const trade = docs;
            resolve(trade);
          });
        });
        const trades = tradePromise.then((result) => {
          return result;
        });
        if (!trades) {
          throw new Error('Error')
        }
        return trades;
      }
    }
  }
}








export {
  tradeQueries,
  tradeMutations,
  deleteMutations,
  searchQuery,
  updateMutations
};