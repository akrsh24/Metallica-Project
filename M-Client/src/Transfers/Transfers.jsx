import React, { Component } from 'react';
import TradeForm from './TradeForm';
import PlainHome from '../PlainHome';
import TradeList from './TradeList';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import SearchBar from '../Transfers/SearchBar';

class Transfers extends Component {
    render() {
        return (
           
                <div className="container">
                    <Router>
                        <div className="">
                            <div className="">
                                <SearchBar />
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-8">
                                    {/* <TradeList /> */}
                                </div>
                                <div className="col-sm-4">
                                    <div className="col-sm-12 col-md-12">
                                        <Route path="/home" component={PlainHome} />
                                        <Route path="/tradeform" component={TradeForm} />
                                        {/* <Route path="/edit-trade/:idd/:commodity/:side/:quantity/:price/:counterparty/:location" component={TradeFormEdit} /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Router>
                </div>
        );
    }
}

export default Transfers;
