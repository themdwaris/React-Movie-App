import React, { useState } from "react";

import "./switchTabs.scss"

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab,setSelectedTab] = useState(0)
    const [left,setLeft] = useState(0)
const activeTab = (tab,index) =>{
    setLeft(index*100)
    setTimeout(() => {
        setSelectedTab(index)
    }, 100);
    onTabChange(tab,index)
}
  return (
    <div className="switchingTab">
      <div className="tabItems">
        {data.map((tab, index) => {
          return <span key={index} className={`tabItem ${selectedTab===index?"active":""}`} onClick={()=>activeTab(tab,index)}>{tab}</span>;
        })}
        <span className="movingBg" style={{left}}/>
      </div>
    </div>
  );
};

export default SwitchTabs;
