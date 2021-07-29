import React, {Component} from 'react';
import './passwordinput.css';

class PasswordInput extends Component {

    state = {
        password: '',
        inputClass: 'passwordInput'
    }

    error = () => {
        this.setState({inputClass: 'passwordInput passwordError'});
    }

    resolve = () => {
        this.setState({inputClass: 'passwordInput'});
    }

    onChange = e => {
        this.setState({[e.target.id]: e.target.value});
    };

    render() {
        return <input className={this.state.inputClass} onChange={this.onChange} value={this.state.password} id='password' type='password' placeholder='password' autoComplete='password'/>;
    }
}

export default PasswordInput
