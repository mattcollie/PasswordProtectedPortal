import React, {Component} from 'react';
import './App.css';

import PasswordModal from "./components/passwordmodal/passwordmodal";
import {SECRET} from "./constants";

class App extends Component {

    render() {
        let location = 'http://www.google.com';

        return (
            <div className="App">
                <PasswordModal secret={SECRET} location={location}/>
            </div>
        );
    }
}

export default App;
