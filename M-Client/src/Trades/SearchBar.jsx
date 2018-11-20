import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

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

                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div class="form-row">
                                            <div class="col-2">
                                                <input id="date" type="date" ref="fromdate" class="form-control" />
                                            </div>&nbsp;
                                            <h2>
                                                <i class="fa fa-long-arrow-right" aria-hidden="true"></i></h2> &nbsp;
                                            <div class="">
                                                <input id="date" type="date" ref="todate" class="form-control" />
                                            </div>
                                            <div class="col">
                                                <select ref="name" className="form-control"  >
                                                    <option value="null" disabled selected> Commodity</option>
                                                    <option value="Copper">Copper</option>
                                                    <option value="Gold"> Gold</option>
                                                    <option value="Platinum">Platinum</option>
                                                    <option value="Rubber"> Rubber</option>
                                                    <option value="Wool"> Wool</option>
                                                    <option value="Corn"> Corn</option>
                                                    <option value="Wheat"> Wheat</option>
                                                    <option value="Milk"> Milk</option>
                                                    <option value="Tin"> Tin</option>
                                                </select>
                                            </div>
                                            <div class="col">

                                                <select ref="side" className="form-control" >
                                                    <option value="null" disabled selected> Side</option>
                                                    <option value="Buy"> Buy</option>
                                                    <option value="Sell"> Sell</option>
                                                </select>
                                                {/* &nbsp;
                                            <input type="radio" name="side" value="Buy" ref="side" className="form-control"/>Buy &nbsp;
                                            <input type="radio" name="side" value="Sell" ref="side" className="form-control"/>Sell 
                                            
                                            <br/> */}
                                            </div>
                                            <div class="col">
                                                <select ref="counterparty" className="form-control" >
                                                    <option value="null" disabled selected> Counterparty</option>
                                                    <option value="Rebecca"> Rebecca</option>
                                                    <option value="Jorawar"> Jorawar</option>
                                                    <option value="Mohana"> Mohana</option>
                                                    <option value="Abhishek"> Abhishek</option>
                                                    <option value="Raghav"> Raghav</option>
                                                    <option value="Sumukh"> Sumukh</option>
                                                    <option value="Sweta"> Sweta</option>
                                                    <option value="Akarsh"> Akarsh</option>
                                                    <option value="Bhargo"> Bhargo</option>

                                                </select>
                                            </div>
                                            <div class="col">
                                                <select ref="location" className="form-control"  >
                                                    <option value="null" disabled selected>Location</option>>
                                                    <option value="India"> India</option>
                                                    <option value="US"> US</option>
                                                    <option value="China"> China</option>
                                                    <option value="England"> England</option>
                                                    <option value="France"> France</option>
                                                    <option value="Mexico"> Mexico</option>
                                                    <option value="Bangladesh"> Bangladesh</option>
                                                    <option value="Pakistan"> Pakistan</option>
                                                    <option value="Syria"> Syria</option>
                                                </select>                                            </div>
                                            &nbsp;<button className="btn float-right"><i class="fa fa-search" aria-hidden="true"></i></button> &nbsp; &nbsp;
                                            <button onClick={this.reloadd} className="btn float-right" overrides={{ Color: "red" }}><i class="fa fa-refresh" aria-hidden="true"></i></button>
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

export default withRouter(SearchBar);
