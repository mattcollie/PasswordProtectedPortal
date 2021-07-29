import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import mojs from '@mojs/core'

const LOCKED = 0;
const UNLOCKED = 1;
const LOCK_BLOCKED = 2;

class Lock extends Component {

    state = {
        status: LOCKED
    }

    componentDidMount() {
        this.setState({
            burst: new mojs.Burst({
                parent: '#lockAnim',
                radius: { 0: 40 },
                count: 10,
                children: {
                    shape: 'circle',
                    radius: 4,
                    fill: '#77DD77',
                    angle: { 360: 0 },
                    duration: 1000,
                    degreeShift: 'rand(-90, 90)',
                    delay: 'rand(0, 200)',
                }
            }),
            shake: new mojs.Html({
                el: '#lockContainer',
                x: {0: 10},
                duration: 420,
                isYoyo: true,
                repeat: 1,
                easing: 'elastic.in',
            })
        });
    }

    lock() {
        this.setState({status: LOCKED});
    }

    error() {
        this.setState({status: LOCK_BLOCKED});
    }

    unlock() {
        this.setState({status: UNLOCKED});
    }

    render() {
        let backgroundColour = 'white';
        let lockColour = '#453db8';
        let lock = faLock;

        if(this.state.status === UNLOCKED) {
            backgroundColour = 'transparent';
            lockColour = '#77DD77';
            lock = faUnlock;
            this.state.burst.play();
        } else if(this.state.status === LOCK_BLOCKED) {
            backgroundColour = '#FEE3E3';
            lockColour = '#D83B3B';
            this.state.shake.play()
        }

        return (<>
            <div onClick={this.props.onClick} id="lockContainer" style={{
                height: 64,
                width: 64,
                backgroundColor: backgroundColour,
                borderRadius: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <FontAwesomeIcon id="lockIcon" icon={lock} style={{
                    fontSize: 24,
                    color: lockColour
                }} />
                <div id="lockAnim" style={{
                    position: 'absolute',
                }} />
            </div>
        </>);
    }
}

export default Lock
