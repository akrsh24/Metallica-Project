import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import "font-awesome/css/font-awesome.css"
import {
    Link,
    withRouter
} from "react-router-dom";
import { graphql } from 'react-apollo';

import * as Query from '../Queries/Query';

const addTrade = Query.addTrade;

@inject('store')
@observer
class TradeForm extends Component {


    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }


    handleSubmit(e) {
        e.preventDefault();
        let newTrade = {
            idd:this.props.store.count,
            commodity: this.refs.commodity.value,
            side: this.refs.side.value,
            counterparty: this.refs.counterparty.value,
            price: this.refs.price.value,
            quantity: this.refs.quantity.value,
            location: this.refs.location.value
        }
        this.props.store.saveTrade(newTrade);
        console.log(this.props.store.trade);

        this.props.addmutation({
            variables: {
                input: this.props.store.trade
            }
        })
            .then(({ data }) => {
                console.log('got data', data);
                alert('New Trade is added');
            })

            window.location.reload();

    }

    render() {
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
                                <h4>New Trade</h4>
                                <Link to="/home"><i className="fa fa-trash">Discard</i></Link>&nbsp; &nbsp;
                            </div>

                            <div className="card-body">
                                <div className="">
                                    <form className="form-horizontal" onSubmit={(e) => this.handleSubmit(e)}>
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label for="date" className="col-sm-4 control-label">Date</label>
                                                <input id="date" type="date" ref="date" className="col-sm-8 control-label" />
                                            </div>

                                            <div className="form-group">
                                                <label for="commodity" className="col-sm-4 control-label">Name</label>
                                                <select ref="commodity" id="commodity" className="col-sm-8 control-label">
                                                    <option value="AL">Aluminium</option>
                                                    <option value="ZN">Zinc</option>
                                                    <option value="CU">Copper</option>
                                                    <option value="PB">Lead</option>
                                                    <option value="AU">Silver</option>
                                                    <option value="AG">Gold</option>
                                                    <option value="PT">Platinum</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label for="side" className="col-sm-4 control-label">Side</label>
                                                <select ref="side" id="side" className="col-sm-8 control-label">
                                                    <option value="Buy"> Buy</option>
                                                    <option value="Sell"> Sell</option>
                                                </select>
                                            </div>

                                            <div className="form-group">
                                                <label for="quantity" className="col-sm-4 control-label">Quantity</label>
                                                <input ref="quantity" type="number" className="col-sm-8 control-label" id="quantity" required aria-required="true" pattern="[0-9]+" />
                                            </div>

                                            <div className="form-group">
                                                <label for="price" className="col-sm-4 control-label">Price</label>
                                                <input ref="price" type="number" className="col-sm-8 control-label" id="price" required aria-required="true" pattern="[0-9]+" />
                                            </div>

                                            <div className="form-group">
                                                <label for="counterparty" className="col-sm-4 control-label">Party</label>
                                                <select ref="counterparty" id="counterparty" className="col-sm-8 control-label">
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
                                                <select ref="location" id="location" className="col-sm-8 control-label">
                                                    <option value="ARG">Argentina</option>
                                                    <option value="LON">London</option>
                                                    <option value="NYC">New York</option>
                                                    <option value="LA">Los Angeles</option>
                                                    <option value="AUS">Australia</option>
                                                    <option value="IND">India</option>
                                                    <option value="TOK">Tokyo</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-primary" style={style}>Save</button>
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

const AddTrade = graphql(addTrade, { name: 'addmutation' })(TradeForm)
export default withRouter(AddTrade);