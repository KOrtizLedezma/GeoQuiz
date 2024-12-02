import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useScores } from '@/Contexts/ProfileContext';
import "../../Styles/DashboardStyles/TabsStyles.css";

function AchievementsComponent() {
  const [lvl1path, setLvl1Path] = useState(null);
  const [lvl2path, setLvl2Path] = useState(null);
  const [lvl3path, setLvl3Path] = useState(null);
  const [lvl4path, setLvl4Path] = useState(null);

  const { badges, updateBadges } = useScores();

  const checkBadges = async () => {
    badges.forEach((badge) => {
      const [level, state] = Object.entries(badge)[0];

      switch (level) {
        case 'lvl1':
          setLvl1Path(state ? "/images/lvl1-unlocked.png" : "/images/lvl1-locked.png");
          break;
        case 'lvl2':
          setLvl2Path(state ? "/images/lvl2-unlocked.png" : "/images/lvl2-locked.png");
          break;
        case 'lvl3':
          setLvl3Path(state ? "/images/lvl3-unlocked.png" : "/images/lvl3-locked.png");
          break;
        case 'lvl4':
          setLvl4Path(state ? "/images/lvl4-unlocked.png" : "/images/lvl4-locked.png");
          break;
      }
    });
  };

  useEffect(() => {
    checkBadges();
    updateBadges();
  }, []);

  return (
    <div className="content-container">
      <h2 className="title">Achievements</h2>
      <div className="grid-container">
        <div className="grid-item">
          {lvl1path && <Image src={lvl1path} alt="Level 1 Badge" width={100} height={100} />}
          <h3>Bronze Explorer</h3>
          <p>Unlock this badge by getting 250 points!</p>
        </div>
        <div className="grid-item">
          {lvl2path && <Image src={lvl2path} alt="Level 2 Badge" width={100} height={100} />}
          <h3>Silver Challenger</h3>
          <p>Unlock this badge by getting 500 points!</p>
        </div>
        <div className="grid-item">
          {lvl3path && <Image src={lvl3path} alt="Level 3 Badge" width={100} height={100} />}
          <h3>Gold Achiever</h3>
          <p>Unlock this badge by getting 750 points!</p>
        </div>
        <div className="grid-item">
          {lvl4path && <Image src={lvl4path} alt="Level 4 Badge" width={100} height={100} />}
          <h3>Platinum Master</h3>
          <p>Unlock this badge by getting 1000 points!</p>
        </div>
      </div>
    </div>
  );
}

export default AchievementsComponent;
