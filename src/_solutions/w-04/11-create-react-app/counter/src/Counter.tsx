import React from 'react';

import './Counter.css';

interface CounterProps {
    initCounter: number
}
interface CounterState {
    count: number
}

export class Counter extends React.Component<CounterProps, CounterState> {
    static defaultProps: CounterProps = {
        initCounter: 0,
    }
    state = { count: this.props.initCounter }

    incrementCount = () => {
        this.setState(
            { count: this.state.count + 1 }
        );
    };

    render() {
        return (
            <h1 className={"Counter"} onClick={ this.incrementCount }>
                Clicks: { this.state.count }
            </h1>
        );
    }
}