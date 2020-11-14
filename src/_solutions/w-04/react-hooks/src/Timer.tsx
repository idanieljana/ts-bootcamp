import React from 'react';

/**
 * Best option version
 */

interface TimerProps {
    start?: number;
    step?: number;
}

export function Timer (props: TimerProps) {
    const [timer, setTimer] = React.useState(props.start!)
    React.useEffect(() => {
        console.log("Calling React.useEffect")
        const id = setInterval(() => {
            setTimer(current => {
                const next = 1 + current
                console.log(`Updating value ${current} to:` + next)
                return next
            })
        }, 1000);
        console.log("Creating ID:" + id)
        return () => {
            console.log("Clearing ID:" + id)
            clearTimeout(id);
        }
    }, []);
    return (
        <div>Timer: {timer}</div>
    )
}
Timer.defaultProps = {
    start: 1,
}
