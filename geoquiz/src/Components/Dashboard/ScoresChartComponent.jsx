import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import "../../Styles/DashboardStyles/ScoresChartStyles.css";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, TimeScale);

function ScoresChartComponent({ dataset }) {
    const maxScore = Math.max(...dataset.map(entry => entry.currentScore));

    const rootStyle = getComputedStyle(document.documentElement);
    const lineColor = rootStyle.getPropertyValue('--blue').trim();

    const chartData = {
        labels: dataset.map(entry => entry.date),
        datasets: [
            {
                label: 'Score',
                data: dataset.map(entry => entry.currentScore),
                borderColor: lineColor,
                backgroundColor: lineColor,
                fill: true,
                tension: 0.1,
                pointRadius: 5,
                pointHoverRadius: 7,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: false,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                max: maxScore + 10,
                title: {
                    display: false,
                    text: 'Score',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>Score Over Time</h2>
            <Line data={chartData} options={options} />
        </div>
    );
}

export default ScoresChartComponent;
