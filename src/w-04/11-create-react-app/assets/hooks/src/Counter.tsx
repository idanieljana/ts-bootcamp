import React from 'react';
import './Counter.css';

interface CounterState {
    count: number;
    name: string;
}

interface CounterProps {
    initCount?: number
}

function Name(props: { name: string }) {
    return <li>{props.name}</li>
}

export class Counter extends React.Component<CounterProps, CounterState> {
    static defaultProps: CounterProps = {
        initCount: 2
    }
    state = { count: 0, name: "Counter" }

    incrementCount = () => {
        this.setState((state) => (
            { count: state.count + 1 }
        ));
    };
    render() {
        const { count, name } = this.state;
        const { initCount } = this.props;
        const list = ["John", "Alice", "Bob"];
        const names = list.map((name, index) => {
            return <Name key={index} name={name} />
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