'use-strict';

import gql from 'graphql-tag'

export const tradeList = gql`
            query {
                trades{
                            idd
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
                        side
                        counterparty
                        price
                        quantity
                        location
                       }   
           }
`;

export const deleteTrade = gql`
           mutation deleteTrade($idd:String!){
                deleteTrade(idd:$idd){
                        idd
                        commodity
                        side
                        counterparty
                        price
                        quantity
                        location
                       }   
           }
`;



