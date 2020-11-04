import React from 'react'

interface TimerProps {
    start?: number;
}
export const Timer: React.FC<TimerProps> = (props) => {
    const [timer, setTimer] = React.useState(props.start || 1);
    React.useEffect(() => {
        const intervalId = window.setInterval(() => {
            // DEMO of effect cleanup: console.log("intervalId " + intervalId);
            setTimer(timer => {
                const newValue = timer + 1;
                // DEMO of effect cleanup: console.log("Counter" + newValue + " " + intervalId);
                return newValue;
            });
        }, 1000)
        return () => {
            window.clearInterval(intervalId)
        }
    }, [])
    return <div>Timer: {timer}</div>
}
Timer.defaultProps = {
    start: 1,
}