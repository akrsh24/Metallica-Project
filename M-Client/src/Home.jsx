import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './css/Home.css'
import Trades from './Trades/Trades'
import MainHome from './MainHome';


class Home extends Component {
    render() {
        const style = {
            'float': 'right',
            ' margin-left': '10em',
            'margin-right':'10px'
        };
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link to="/" className="navbar-brand">Metallica</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link " id="trades-tab" data-toggle="tab" to='/trades' role="tab" aria-controls="trades" aria-selected="true">TRADES</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" id="transfers-tab" data-toggle="tab" to='' role="tab" aria-controls="transfers" aria-selected="false">TRANSFERS</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" id="transports-tab" data-toggle="tab" to='' role="tab" aria-controls="transports" aria-selected="false">TRANSPORTS</Link>
                                </li>
                            </ul>
                           

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade " id="trades" role="tabpanel" aria-labelledby="trades-tab"></div>
                                <div className="tab-pane fade" id="transfers" role="tabpanel" aria-labelledby="transfers-tab"></div>
                                <div className="tab-pane fade" id="transports" role="tabpanel" aria-labelledby="transports-tab"></div>
                            </div>
                        </div>
                        
                        <img src="./images/akarsh.jpg" alt="Avatar" className="avatar" style={style} />
                    </nav>
                   
                    <hr />
                    <div className="container" style={{ 'marginTop': '2%' }}>
                        <div className="well">
                            <div>
                                <Route exact path="/" component={MainHome} />
                                <Route path="/trades" component={Trades} />

                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Home;