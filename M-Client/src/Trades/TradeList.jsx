import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom'
import { observer } from 'mobx-react';
import * as Query from '../Queries/Query';
import { graphql } from '../../node_modules/react-apollo';
import moment from 'moment';

const deleteTrade = Query.deleteTrade

@observer
class TradeList extends Component {

    constructor(props) {
        super(props);
        this.renderTrades = this.renderTrades.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    componentWillMount() {
        this.props.store.searchAll();
    }

    deleteItem(id) {

        console.log(id);

        this.props.deletemutation({
            variables: {
                id: id
            }
        })
            .then(({ data }) => {
                console.log("Trade is deleted", data);
                alert('Trade is deleted');
            })
    }

    trades = [];


    renderTrades() {
        if (this.props.store.isSearch === false ? this.trades = this.props.store.allTrades : this.trades = this.props.store.searchTrades)
            return this.trades.map((trade) => {
                return (
                    <tr key={trade.id}>
                        <td> {moment(trade.tdate).format(" MM/DD/YYYY ")}</td>
                        <td>{trade.commodity}</td>
                        <td>{trade.side}</td>
                        <td>{trade.quantity}</td>
                        <td>${trade.price}</td>
                        <td>{trade.counterparty}</td>
                        <td>{trade.location}</td>
                        <td><Link to={`edit-trade/${trade.id}/${trade.commodity}/${trade.side}/${trade.quantity}/${trade.price}/${trade.counterparty}/${trade.location} `}><i className="fa fa-edit"></i></Link></td>
                        <td><a href="/trades" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(trade.id) }} ><i className="fa fa-trash"></i></a></td>
                    </tr>
                );
            });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2> Trade<Link className="btn btn float-right btn-round" to="/tradeform"><span className="glyphicon glyphicon-plus"><i className="fa fa-plus" aria-hidden="true"></i></span></Link></h2>
                </div>

                <div className="card-body">
                    <table className="table table-hover table-sm-col-md-10">
                        <th scope="col">Date</th>
                        <th scope="col">Commodity</th>
                        <th scope="col">Side</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                        <th scope="col">Counterparty</th>
                        <th scope="col">Location</th>
                        <tbody>
                            {this.renderTrades()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


const tradeList = graphql(deleteTrade, { name: 'deletemutation' })(TradeList)
export default withRouter(tradeList);