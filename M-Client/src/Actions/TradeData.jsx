import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import * as Query from '../Queries/Query';
import  TradeList  from '../Trades/TradeList'
import { observer } from '../../node_modules/mobx-react';
const allTrade = Query.tradeList;

@observer
class TradeData extends Component {

    render() {
       

        if (this.props.data && this.props.data.loading)
            return <div>Loading</div>;

        else if (this.props.data && this.props.data.error)
            return <div>Error</div>;

        else {
            this.props.store.storeTradeData(this.props.data.trades);
           
        return <div><TradeList store = {this.props.store}/> </div>;

        }
    }
}

export default graphql(allTrade)(TradeData);