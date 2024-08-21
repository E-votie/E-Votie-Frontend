import React, { useState, useEffect } from 'react';

const CountingEffect = ({ value = 100, textSize = '2rem', color = 'black', duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const end = parseInt(value);
        const stepCount = 100; // Number of steps to reach the final value
        const stepValue = end / stepCount;
        const stepDuration = duration / stepCount;

        let current = 0;
        const timer = setInterval(() => {
            current += stepValue;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, stepDuration);

        return () => clearInterval(timer);
    }, [value, duration]);

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <span style={{ fontSize: textSize, color: color, transition: 'color 0.3s ease' }}>
      {formatNumber(count)}
    </span>
    );
};

export default CountingEffect;