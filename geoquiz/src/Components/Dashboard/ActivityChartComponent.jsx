import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import "../../Styles/DashboardStyles/TabsStyles.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

function ActivityChartComponent({ dataset }) {

    const rootStyle = getComputedStyle(document.documentElement);
    const lineColor = rootStyle.getPropertyValue('--green').trim();
    const gradient = (ctx) => {
        const chart = ctx.chart;
        const { ctx: canvasCtx, chartArea } = chart;
        if (!chartArea) return null;
        const gradient = canvasCtx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(144, 238, 144, 1)'); // Light green (LimeGreen-like)
        // Dark green at the middle and top
        gradient.addColorStop(0.5, 'rgba(34, 139, 34, 1)'); // Forest Green (intermediate)
        gradient.addColorStop(1, 'rgba(0, 100, 0, 1)'); // Dark Green (top)
        return gradient;
    };

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Score Increase',
                data: [],
                backgroundColor: (context) => gradient(context),
                borderRadius: 10,
                
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
                    backgroundColor: (context) => gradient(context),
                    borderRadius: 10,
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
        <div className='content-container'>
            <h2 className="title">Progress</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default ActivityChartComponent;
