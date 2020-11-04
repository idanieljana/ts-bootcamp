import React from 'react';
import './Counter.css';

interface CounterState {
    count: number;
    name: string;
}

interface CounterProps {
    initCount?: number
    step?: number
}

export class Counter extends React.Component<CounterProps, CounterState> {
    static defaultProps: CounterProps = {
        initCount: 2,
        step: 1
    }
    state = { count: 0, name: "Clicks", step: 1 }

    incrementCount = () => {
        this.setState((state, props) => (
            { count: state.count + props.step! }
        ));
    };
    render() {
        const { count, name } = this.state;
        return (
            <>
                <h1 className={"counter"} onClick={ this.incrementCount }>
                    {name}: { count }
                </h1>
            </>
        );
    }
}