import React, { useState, useEffect } from 'react';

const PercentageCountingEffect = ({ value = 100, textSize = '2rem', color = 'black', duration = 2000, decimalPlaces = 1 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseFloat(value);
        const incrementTime = (duration / (end * 100)) * 1000;

        let timer = setInterval(() => {
            start += 0.1;
            setCount(Number(start.toFixed(decimalPlaces)));
            if (start >= end) {
                clearInterval(timer);
                setCount(end);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration, decimalPlaces]);

    const formatPercentage = (num) => {
        return num.toFixed(decimalPlaces) + '%';
    };

    return (
        <span style={{ fontSize: textSize, color: color, transition: 'color 0.3s ease' }}>
      {formatPercentage(count)}
    </span>
    );
};

export default PercentageCountingEffect;