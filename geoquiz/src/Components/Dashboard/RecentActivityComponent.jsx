import React from 'react';
import { useScores, useState } from '@/Contexts/ProfileContext';
import "../../Styles/DashboardStyles/TabsStyles.css";

function RecentActivityComponent() {

    const { activities } = useScores();

    console.log(activities);

    const validActivities = activities?.filter(
        (activity) => activity.score !== null && activity.difficulty !== null && activity.date !== null
    ) || [];

    return (
        <div className="recent-activity">
            <h2 className="recent-activity-title">Recent Activity</h2>
            {validActivities.length > 0 ? (
                <ul className="activity-list">
                    {validActivities.map((activity, index) => (
                        <li key={index} className="activity-item">
                            <p>
                                <span className="activity-label">Score:</span> {activity.score}
                            </p>
                            <p>
                                <span className="activity-label">Difficulty:</span> {activity.difficulty}
                            </p>
                            <p>
                                <span className="activity-label">Date:</span> {new Date(activity.date).toLocaleString()}
                            </p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-activity">No recent activity to display.</p>
            )}
        </div>
    );
}

export default RecentActivityComponent;
