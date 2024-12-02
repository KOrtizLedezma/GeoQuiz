import React from 'react';
import { useScores } from '@/Contexts/ProfileContext';
import "../../Styles/DashboardStyles/DashboardPageStyles.css";

function RecentActivityComponent() {

    const { activities } = useScores();

    const validActivities = activities?.filter(
        (activity) => activity.score !== null && activity.difficulty !== null && activity.date !== null
    ) || [];

    return (
        <div className="recent-activity">
            <h2 className="recent-activity-title">Recent Activity</h2>
            {validActivities.length > 0 ? (
                <div className="activity-list-container">
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
                </div>
            ) : (
                <p className="no-activity">No recent activity to display.</p>
            )}
        </div>
    );
}

export default RecentActivityComponent;
