import React from 'react';

const Timer: React.FC<{ initCount?: number;}> = (props) => {
    const [timer, setTimer] = React.useState(props.initCount || 1);
    React.useEffect(() => {
        const intervalId = window.setInterval(() => {
            console.log("intervalId " + intervalId);
            setTimer(timer => {
                const newValue = timer + 1;
                console.log("Counter" + newValue + " " + intervalId);
                return newValue;
            });
        }, 1000)
        return () => {
            window.clearInterval(intervalId)
        }
    }, [])
    return <div>{timer}</div>
}
Timer.defaultProps = {
    initCount: 100,
}