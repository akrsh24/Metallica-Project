'use-strict'
import { observable, action } from 'mobx';
import { client } from '../Trades/Trades'
import * as Query from '../Queries/Query';
const searchQuery = Query.searchQuery;
const allTrades = Query.tradeList;
const updateTrade = Query.updateTrade;

class TradeStore {



    @observable
    trade = {
        id: '',
        tdate: '',
        commodity: '',
        side: '',
        price: '',
        quantity: '',
        counterparty: '',
        location: '',
    }

    @observable
    toAddTrade = {
        tdate: '',
        commodity: '',
        side: '',
        price: '',
        quantity: '',
        counterparty: '',
        location: '',
    }

    @observable
    searchTrade = {
        tdate: '',
        fdate: '',
        commodity: '',
        side: '',
        counterparty: '',
        location: '',
    }

    @observable
    toUpdateTrade = {
        id: '',
        commodity: '',
        side: '',
        price: '',
        quantity: '',
        counterparty: '',
        location: ''
    }

    @observable
    allTrades = [];

    @observable
    searchTrades = [];

    @observable
    isSearch = false;

    @action
    saveTrade(newTrade) {
        this.toAddTrade = newTrade;
        console.log(this.trade);
        console.log("new trade is added");
    }

    @action
    storeTradeData(tradeData) {
        this.trades = tradeData
    }

    @action
    filterTrades(sTrade) {
        console.log(sTrade);
        this.searchTrade = sTrade;
        console.log(this.searchTrade);
    }

    @action
    saveSearchTrade(newTrade) {
        this.searchTrade = newTrade;
        console.log(this.searchTrade);
    }

    @action
    searchAll = () => {
        let query = allTrades;
        return client.query(
            {
                query,
                fetchPolicy: 'network-only'
            }
        ).then(res => {
            this.allTrades = res.data.trades;
        })
    }

    @action
    saveRenderTrades(trade) {
        this.toUpdateTrade = trade
    }



    @action
    searchFilter = () => {
        let variables = {
            input: this.searchTrade,
        }
        let query = searchQuery;
        return client.query(
            {
                query,
                variables,
                fetchPolicy: 'network-only'
            }
        ).then(res => {
            this.searchTrades = res.data.searchTrades;
        })
    }

    @action
    handleChange(id, value) {
        this.toUpdateTrade[id] = value
    }


    saveEditedTrade = () => {
        let variables = {
            input: this.toUpdateTrade,
        }
        let mutation = updateTrade;
        return client.mutate({
            mutation,
            variables,
            fetchPolicy: 'no-cache'
        }).then(res => {
            console.log("Trade is updated",res);

        })
    }



}

export default TradeStore;
