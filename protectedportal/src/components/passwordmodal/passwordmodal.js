import React, {Component, createRef} from 'react';
import './passwordmodal.css';
import Lock from "./lock/lock";
import PasswordInput from "./passwordinput/passwordinput";

class PasswordModal extends Component {

    constructor(props) {
        super(props);
        this.lock = createRef();
        this.password = createRef();
        this.state = {
            statusTextClass: 'status-text',
            statusText: 'Please enter the password to view this link'
        }
    }

    componentDidMount() {
        let onChange = this.password.current.onChange;
        this.password.current.onChange = (e) => {
            this.resolveError();
            return onChange(e);
        }
    }

    resolveError = () => {
        this.lock.current.lock();
        this.password.current.resolve();
        this.setState({
            statusText: 'Please enter the password to view this link',
            statusTextClass: 'status-text',
        });
    }

    onSubmit = e => {
        e.preventDefault();
        let password = this.password.current.state.password;

        if(password === this.props.secret) {
            this.lock.current.unlock();
            setTimeout(() => {
                // window.location.href = this.props.location;
            }, 1000);
        } else {
            this.lock.current.error();
            this.password.current.error();
            this.setState({
                statusText: 'Invalid password',
                statusTextClass: 'status-text-error',
            });
        }
    }

    render() {

        return (<>
            <form className="container password-modal" onSubmit={this.onSubmit}>
                <div className="row lock-row" style={{height: '20%'}}>
                    <Lock ref={this.lock} />
                </div>

                <div className="row" style={{height: '20%'}}>
                    <h1 className="header-text">This link is Password protected</h1>
                    <h2 className={this.state.statusTextClass}>{this.state.statusText}</h2>
                </div>

                <div className="row" style={{height: '20%'}}>
                    <PasswordInput ref={this.password} />
                </div>

                <div className="row" style={{height: '20%'}}>
                    <input id='submit' type="submit" value="Submit" />
                </div>
            </form>
        </>);
    }
}

export default PasswordModal
