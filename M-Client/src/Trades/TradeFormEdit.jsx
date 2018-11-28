import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'

import {
    Link,
    withRouter,
} from "react-router-dom";


@inject('store')
@observer
class TradeFormEdit extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveEditedTrade = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.store.handleChange(e.target.name, e.target.value);
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.store.saveEditedTrade();
        console.log("Trade is updated");
        window.location.href = '/trades'
    }

    componentWillMount() {
        let preState = {
            id: this.props.match.params.id,
            commodity: this.props.match.params.commodity,
            side: this.props.match.params.side,
            quantity: this.props.match.params.quantity,
            counterparty: this.props.match.params.counterparty,
            price: this.props.match.params.price,
            location: this.props.match.params.location
        }

        this.props.store.saveRenderTrades(preState);
    }


    render() {
        let trade = this.props.store.toUpdateTrade;
        const style = {
            'padding': '5px',
            'margin-left': '145px',
            'margin-top': '0px',
            'margin-right': ' 2px'
        }
        return (
            <div>
                <div className="row">
                    <div className="col-md-18 ">
                        <div className="card" >
                            <div className="card-header">
                                <h4>Trade ID: {trade.id}</h4>
                                <Link to="/home"><i className="fa fa-trash">Discard</i></Link>&nbsp; &nbsp;
                            </div>

                            <div className="card-body">
                                <div className="">
                                    <form className="form-horizontal" onSubmit={(e) => { if (window.confirm('Are you sure you wish to edit this item?')) this.handleSubmit(e) }}>
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label for="commodity" className="col-sm-4 control-label">Name</label>
                                                <select ref="commodity" name="commodity" className="col-sm-8 control-label" onChange={this.handleChange} value={trade.commodity}>
                                                    <option value="AL">Aluminium</option>
                                                    <option value="ZN">Zinc</option>
                                                    <option value="CU">Copper</option>
                                                    <option value="PB">Lead</option>
                                                    <option value="AG">Silver</option>
                                                    <option value="AU">Gold</option>
                                                    <option value="PT">Platinum</option>
                                                    <option value="FE">Iron</option>

                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label for="side" className="col-sm-4 control-label">Side</label>
                                                <select ref="side" name="side" className="col-sm-8 control-label" onChange={this.handleChange} value={trade.side}>
                                                    <option value="Buy"> Buy</option>
                                                    <option value="Sell"> Sell</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label for="quantity" className="col-sm-4 control-label">Quantity</label>
                                                <input ref="quantity" type="number" className="col-sm-8 control-label" name="quantity" onChange={this.handleChange} required aria-required="true" pattern="[0-9]+" value={trade.quantity} />
                                            </div>

                                            <div className="form-group">
                                                <label for="price" className="col-sm-4 control-label">Price</label>
                                                <input ref="price" type="number" className="col-sm-8 control-label" disabled onChange={this.handleChange} name="price" required aria-required="true" pattern="[0-9]+" value={trade.price} />
                                            </div>

                                            <div className="form-group">
                                                <label for="counterparty" className="col-sm-4 control-label">Party</label>
                                                <select ref="counterparty" name="counterparty" onChange={this.handleChange} className="col-sm-8 control-label" value={trade.counterparty}>
                                                    <option value="Akarsh">Akarsh</option>
                                                    <option value="Anushka">Anushka</option>
                                                    <option value="Anchal">Anchal</option>
                                                    <option value="Aditya">Aditya</option>
                                                    <option value="Arpit">Arpit</option>
                                                    <option value="Ahsaan">Ahsaan</option>
                                                    <option value="Apoorv">Apoorv</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label for="location" className="col-sm-4 control-label">Location</label>
                                                <select ref="location" name="location" className="col-sm-8 control-label" onChange={this.handleChange} value={trade.location}>
                                                    <option value="ARG">Argentina</option>
                                                    <option value="LON">London</option>
                                                    <option value="NYC">New York</option>
                                                    <option value="LA">Los Angeles</option>
                                                    <option value="AUS">Australia</option>
                                                    <option value="IND">India</option>
                                                    <option value="TOK">Tokyo</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-primary" style={style}>Edit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TradeFormEdit);