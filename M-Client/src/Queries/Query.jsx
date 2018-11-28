'use-strict';

import gql from 'graphql-tag'

export const tradeList = gql`
            query {
                trades{
                            id
                            tdate
                            commodity
                            side
                            quantity
                            price
                            counterparty
                            location
                    }
            }
`;
export const addTrade = gql`
           mutation createTrade($input:TradeInputType !){
                createTrade(input:$input){
                        commodity
                        tdate
                        side
                        counterparty
                        price
                        quantity
                        location
                       }   
           }
`;

export const deleteTrade = gql`
           mutation deleteTrade($id:Int!){
                deleteTrade(id:$id){
                        id
                        tdate
                        commodity
                        side
                        counterparty
                        price
                        quantity
                        location
                       }   
           }
`;

export const searchQuery = gql`
         query searchTrades($input:SearchInputType!){
                searchTrades (input:$input){
                        commodity
                        tdate
                        side
                        counterparty
                        price
                        quantity
                        location  
                 } 
         }
`;

export const updateTrade = gql`
      mutation updateTrade($input:UpdateInputType!){
        updateTrade(input:$input){
                        id
                        tdate
                        commodity
                        side
                        counterparty
                        price
                        quantity
                        location
        }
      }
`

