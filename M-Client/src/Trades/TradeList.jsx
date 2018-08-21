import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom'
import { observer } from '../../node_modules/mobx-react';
import * as Query from '../Queries/Query';
import { graphql } from '../../node_modules/react-apollo';

const deleteTrade = Query.deleteTrade

@observer
class TradeList extends Component {

    constructor(props) {
        super(props);
        this.renderTrades = this.renderTrades.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem (id) {
        console.log(id);
        this.props.deletemutation({
            variables: {
                idd: id
            }
        })
            .then(({ data }) => {
                console.log("Trade is deleted", data);
                this.props.store.count--;
                alert('Trade is deleted');
            })
    }

    renderTrades() {
        return this.props.store.trades.map((trade) => {
            return (
                <tr key={trade.idd}>
                    <td>{trade.commodity}</td>
                    <td>{trade.side}</td>
                    <td>{trade.quantity}</td>
                    <td>{trade.price}</td>
                    <td>{trade.counterparty}</td>
                    <td>{trade.location}</td>
                    {/* <td><Link to={`edit - trade / ${ trade.idd } /${trade.commodity}/${ trade.side } /${trade.quantity}/${ trade.price } /${trade.counterparty}/${ trade.location } `}><i className="fa fa-edit"></i></Link></td> */}
                    <td><a href="/" onClick={() => this.deleteItem(trade.idd)}><i className="fa fa-trash"></i></a></td>
                </tr>
            );
        });
        window.location.reload();
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h2> Trade<Link className="btn btn float-right btn-round" to="/tradeform"><span className="glyphicon glyphicon-plus"><i className="fa fa-plus" aria-hidden="true"></i></span></Link></h2>
                </div>

                <div className="card-body">
                    <table className="table table-hover table-sm-col-md-8">
                        <th scope="col">Commodity</th>
                        <th scope="col">Side</th>
                        <th scope="col">Quantity</th>
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