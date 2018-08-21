import { observable, action } from 'mobx';



class TradeStore {


    @observable
    count = 1;

    @observable
    trade = {
        idd:'',
        commodity: '',
        side: '',
        price: '',
        quantity: '',
        counterParty: '',
        location: '',
    }

    @observable
    trades = [];

    @action
    saveTrade(newTrade) {
        this.trade = newTrade;
        console.log(this.trade);
        console.log("new trade is added");
        this.count = this.count + 1;
        console.log(this.count);
        
    }

    @action
    storeTradeData(tradeData) {
        this.trades = tradeData
    }


}

export default TradeStore;