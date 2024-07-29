import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,  // Use ArcElement instead of PieElement
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const DynamicChart = ({ chartData }) => {
    const { Chart_Type, 'x-axiz': xAxis, 'y-axiz': yAxis, Title, data } = chartData;

    const labels = data.map(item => item.bar_name);
    const datasets = [{
        data: data.map(item => item.data),
        backgroundColor: data.map(item => item.color),
        borderColor: data.map(item => item.color),
        borderWidth: 1,
    }];

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: !!Title,
                text: Title,
            },
        },
        scales: Chart_Type !== 'PieChart' ? {
            x: {
                title: {
                    display: !!xAxis,
                    text: xAxis,
                },
            },
            y: {
                title: {
                    display: !!yAxis,
                    text: yAxis,
                },
                beginAtZero: true,
            },
        } : undefined,
    };

    const chartProps = {
        options: chartOptions,
        data: {
            labels,
            datasets,
        },
    };

    switch (Chart_Type) {
        case 'BarChart':
            return <Bar {...chartProps} />;
        case 'PieChart':
            return <Pie {...chartProps} />;
        case 'LineChart':
            return <Line {...chartProps} />;
        default:
            return <div>Unsupported chart type: {Chart_Type}</div>;
    }
};

export default DynamicChart;