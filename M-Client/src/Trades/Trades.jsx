import React, { Component } from 'react';
import TradeForm from './TradeForm';
import PlainHome from './PlainHome';
import {
    BrowserRouter as Router,
    Route,
    withRouter,
} from 'react-router-dom'
import SearchBar from '../Trades/SearchBar';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { Provider, observer } from 'mobx-react'
import TradeStore from '../Store/TradeStore'
import DevTools from 'mobx-react-devtools';
import TradeList from './TradeList';
import TradeFormEdit from './TradeFormEdit';

const httpLink = new HttpLink({ uri: 'http://localhost:2007/graphql' })
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
})

const store = new TradeStore();

@observer
class Trades extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <Provider store={store} >
                    <div className="container">
                        <Router>
                            <div className="">
                                <div className="">
                                    <SearchBar store={store} />
                                    <DevTools />
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-xs-15">
                                        <TradeList store={store} />
                                    </div>
                                    <div className="col-xs-3">
                                        <div className="col-sm-3 col-md-3">
                                            <Route path="/home" component={PlainHome} />
                                           
                                        </div>
                                    </div>
                                  
                                    <Route path="/tradeform" component={TradeForm} />
                                            <Route path="/edit-trade/:id/:commodity/:side/:quantity/:price/:counterparty/:location" component={TradeFormEdit} />
                                </div>
                            </div>
                        </Router>
                    </div>
                </Provider>
            </ApolloProvider >
        );
    }
}

export default withRouter(Trades);