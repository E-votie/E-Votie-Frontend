import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {useEffect, useRef} from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    cutout: '55%',
    animation: {
        animateRotate: true
    },
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            caretSize: 4,
            caretPadding: 6,
            cornerRadius: 2,
            xAlign: 'center',
            yAlign: 'bottom',
            titleMarginBottom: 0,
            footerMarginTop: 0,
            displayColors: false,
        },
    },
    layout: {
        padding: {
            top: 10,
        }
    },
};

const customLegend = {
    id: 'customLegend',
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        const data = chart.data;
        let legendHtml = '<ul>';

        for (let i = 0; i < data.datasets[0].data.length; i++) {
            legendHtml += '<li><div class="chart-legend-inner"><div class="chart-legend-data">' +
                data.datasets[0].data[i] + '</div><span style="background-color:' +
                data.datasets[0].backgroundColor[i] + '"></span>';
            if (data.labels[i]) {
                legendHtml += '<div class="chart-legend-title">' + data.labels[i] + '</div>';
            }
            legendHtml += '</div></li>';
        }
        legendHtml += '</ul>';

        // You'll need to implement a way to insert this HTML into your component
        // For example, you could use a state variable and useEffect
    }
};

function transformData(allIslandResults) {
    if (!Array.isArray(allIslandResults)) {
        console.error('allIslandResults is not an array:', allIslandResults);
        return {
            datasets: [{
                data: [],
                borderWidth: 0,
                backgroundColor: [],
                label: 'All Island Results'
            }],
            labels: []
        };
    }

    const labels = allIslandResults.map(item => item.Party);
    const data = allIslandResults.map(item => item.count);
    const backgroundColor = allIslandResults.map(item => item.color);

    return {
        datasets: [{
            data: data,
            borderWidth: 0,
            backgroundColor: backgroundColor,
            label: 'All Island Results'
        }],
        labels: labels
    };
}

function PieChart({ data }) {
    const chartData = transformData(data);

    return (
        <div style={{width: '200px', height: '200px'}}>
            <Pie data={chartData} options={options}/>
            <div className="mt-4 flex flex-col space-y-2">
                {chartData.labels.map((label, index) => (
                    <div key={index} className="flex items-center">
            <span className="text-sm text-gray-600 w-20 text-right pr-2">
                {chartData.datasets[0].data[index].toLocaleString()}
            </span>
                        <div
                            className="w-4 h-4 mx-2 flex-shrink-0"
                            style={{backgroundColor: chartData.datasets[0].backgroundColor[index]}}
                        ></div>
                        <span className="text-sm font-medium flex-grow">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PieChart;