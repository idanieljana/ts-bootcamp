import React from 'react';

import './Counter.css';

interface CounterProps {
    defaultCount: number
}
interface CounterState {
    count: number
}

export class Counter extends React.Component<CounterProps, CounterState> {

    constructor(props: CounterProps) {
        super(props);
        this.state = { count: props.defaultCount };
    }

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