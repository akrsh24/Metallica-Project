import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class MainHome extends Component {
    render() {
        return (
            <div>
                <div class="jumbotron jumbotron-fluid">
                    <div class="container">
                        <h1 class="display-4">Metallica</h1>
                    </div>
                </div>
                <hr className="my-4" />
            </div>
        );
    }
}

export default MainHome;