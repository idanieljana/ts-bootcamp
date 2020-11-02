import React from 'react';

interface TimerProps { initCount?: number; }
interface TimerState { timer: number }

export class TimerComponent extends React.Component<TimerProps, TimerState> {
    private intervalId?: number;
    static defaultProps: TimerProps = {
        initCount: 100,
    }
    state = { timer: this.props.initCount || 1 }

    public componentDidMount() {
        this.intervalId = window.setInterval(() => {
            console.log("intervalId " + this.intervalId);
            this.setState(state => ({ timer: state.timer + 1 }));
        }, 1000)
    }

    public componentWillUnmount() {
        window.clearInterval(this.intervalId)
    }

    render() {
        return <div>{this.state.timer}</div>
    }
}