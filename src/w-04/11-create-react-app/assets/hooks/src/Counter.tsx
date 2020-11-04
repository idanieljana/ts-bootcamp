import React from 'react';
import './Counter.css';
import {Timer} from "./Timer";

interface CounterState {
    count: number;
    name: string;
}

interface CounterProps {
    initCount?: number
    step?: number
}

function Name(props: { name: string }) {
    return <li>{props.name}</li>
}

export class Counter extends React.Component<CounterProps, CounterState> {
    static defaultProps: CounterProps = {
        initCount: 2,
        step: 1
    }
    state = { count: 0, name: "Counter", step: 1 }

    incrementCount = () => {
        this.setState((state, props) => (
            { count: state.count + props.step! }
        ));
    };
    render() {
        const { count, name } = this.state;
        const { initCount } = this.props;
        const list = ["John", "Alice", "Bob"];
        const names = list.map((name, index) => {
            return <Timer key={index} start={count} step={2} />
        })
        return (
            <>
                <h1 className={"counter"} onClick={ this.incrementCount }>
                    Initial ({initCount}) Clicks: { count } - {name}
                </h1>
                <div>Names</div>
                <ul>
                    {names}
                </ul>
            </>
        );
    }
}