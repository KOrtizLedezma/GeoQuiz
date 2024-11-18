import React, { useState } from 'react';
import "../../Styles/DashboardStyles/TabsStyles.css";
import { FiEdit } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

function ProfileComponent() {

    const [profileData, setProfileData] = useState({
        firstName: "Kenet",
        lastName: "Ortiz",
        email: "kenet2016@icloud.com",
        currentScore: 100
    });

    const [editingField, setEditingField] = useState(null);
    const [tempValue, setTempValue] = useState('');

    const handleEdit = (field, value) => {
        setEditingField(field);
        setTempValue(value);
    };

    const handleSave = (field) => {
        setProfileData(prev => ({
            ...prev,
            [field]: tempValue
        }));
        setEditingField(null);
    };

    const handleCancel = () => {
        setEditingField(null);
        setTempValue('');
    };

  return (
    <div className='content-container'>
        <h2 className="title">Profile Information</h2>

        <div className="profile-fields">
            {Object.entries(profileData).map(([field, value]) => (
                <div key={field} className="profile-field">
                    <label className="field-label">
                        {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}:
                    </label>        
                    <div className="field-content">
                        {editingField === field ? (
                            <div className="edit-mode">
                                <input
                                    type={field === 'currentScore' ? 'number' : 'text'}
                                    value={tempValue}
                                    onChange={(e) => setTempValue(e.target.value)}
                                    className="edit-input"
                                />
                                <button 
                                    onClick={() => handleSave(field)}
                                    className="action-button save"
                                >
                                    <AiOutlineCheck size={18} />
                                </button>
                                <button 
                                    onClick={handleCancel}
                                    className="action-button cancel"
                                >
                                    <IoCloseOutline size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className="display-mode">
                                <span className="field-value">{value}</span>
                                <button 
                                    onClick={() => handleEdit(field, value)}
                                    className="action-button edit"
                                >
                                    <FiEdit size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ProfileComponent