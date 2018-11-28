import React, { Component } from 'react';
import { observer } from '../../node_modules/mobx-react';

@observer
class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.reloadd = this.reloadd.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    handleSubmit = (e) => {
        e.preventDefault();
        let sTrade = {
            commodity: this.refs.name.value,
            side: this.refs.side.value,
            counterparty: this.refs.counterparty.value,
            location: this.refs.location.value,
            fdate: this.refs.fromdate.value,
            tdate: this.refs.todate.value
        }
        this.props.store.filterTrades(sTrade);
        console.log(sTrade);
        console.log(sTrade.fdate);
        console.log(typeof (sTrade.tdate));
        if (sTrade.tdate === "")
            console.log("null");
        else
            console.log("not null");
        this.props.store.isSearch = true;
        this.props.store.searchFilter();
    }

    reloadd(e) {
        this.preventDefault(e);
        this.props.store.isSearch = false;
        window.location.href = '/trades';

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-11 col-md-11">
                        <div className="" >
                            <div className="">
                                <div className="">

                                    <form >
                                        <div class="form-row">
                                            <div class="col-2">
                                                <input id="date" type="date" ref="fromdate" class="form-control"
                                                    min="1900-01-01" max="3000-12-31" />
                                            </div>&nbsp;
                                            <h2>
                                                <i class="fa fa-long-arrow-right" aria-hidden="true"></i></h2> &nbsp;
                                            <div class="">
                                                <input id="date" type="date" ref="todate" class="form-control"
                                                    min="1900-01-01" max="3000-12-31" />
                                            </div>
                                            <div class="col">
                                                <select ref="name" className="form-control"  >
                                                    <option value="all" selected> Commodity</option>
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
                                            <div class="col">

                                                <select ref="side" className="form-control" >
                                                    <option value="all" selected> Side</option>
                                                    <option value="Buy"> Buy</option>
                                                    <option value="Sell"> Sell</option>
                                                </select>

                                            </div>
                                            <div class="col">
                                                <select ref="counterparty" className="form-control" >
                                                    <option value="all" selected> Counterparty</option>
                                                    <option value="Akarsh">Akarsh</option>
                                                    <option value="Anushka">Anushka</option>
                                                    <option value="Anchal">Anchal</option>
                                                    <option value="Aditya">Aditya</option>
                                                    <option value="Arpit">Arpit</option>
                                                    <option value="Ahsaan">Ahsaan</option>
                                                    <option value="Apoorv">Apoorv</option>
                                                </select>
                                            </div>
                                            <div class="col">
                                                <select ref="location" className="form-control"  >
                                                    <option value="all" selected>Location</option>
                                                    <option value="ARG">Argentina</option>
                                                    <option value="LON">London</option>
                                                    <option value="NYC">New York</option>
                                                    <option value="LA">Los Angeles</option>
                                                    <option value="AUS">Australia</option>
                                                    <option value="IND">India</option>
                                                    <option value="TOK">Tokyo</option>
                                                </select>
                                            </div>
                                            &nbsp;
                                            <button className="btn float-right"><i class="fa fa-search" aria-hidden="true" onClick={this.handleSubmit}></i></button> &nbsp; &nbsp;
                                            <button onClick={this.reloadd} className="btn float-right" overrides={{ Color: "red" }}><i class="fa fa-ban" aria-hidden="true"></i></button>
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

export default SearchBar;
