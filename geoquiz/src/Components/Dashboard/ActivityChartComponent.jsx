import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import "../../Styles/DashboardStyles/ScoresChartStyles.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ActivityChartComponent({ dataset }) {

    const rootStyle = getComputedStyle(document.documentElement);
    const lineColor = rootStyle.getPropertyValue('--blue').trim();

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Score Increase',
                data: [],
                backgroundColor: lineColor,
            },
        ],
    });

    useEffect(() => {
        const labels = [];
        const scoreIncreases = [];

        for (let i = 1; i < dataset.length; i++) {
            const prevEntry = dataset[i - 1];
            const currentEntry = dataset[i];
            const scoreIncrease = currentEntry.currentScore - prevEntry.currentScore;

            labels.push(currentEntry.date);
            scoreIncreases.push(scoreIncrease);
        }

        setChartData({
            labels: labels,
            datasets: [
                {
                    label: 'Score Increase',
                    data: scoreIncreases,
                    backgroundColor: lineColor,
                },
            ],
        });
    }, [dataset]);

    const options = {
        scales: {
            x: {
                title: {
                    display: false,
                    text: 'Date',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: false,
                    text: 'Score Increase',
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <h2 className="chart-title">User Activity - Score Increase</h2>
            <div className="chart-wrapper">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
}

export default ActivityChartComponent;
