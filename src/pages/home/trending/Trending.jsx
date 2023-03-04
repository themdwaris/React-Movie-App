import React, { useState } from "react";
import Crousel from "../../../components/carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import "../../../components/switchTabs/switchTabs.scss"
import useFetch from "../../../hooks/useFetch";
const Trending = () => {
    const [endpoint,setEndPoint] = useState("day")
    const {loading,data} = useFetch(`/trending/all/${endpoint}`)
  const onTabChange = (tab) => {
    setEndPoint(tab==="Day"?"day":"week")
  };
//   console.log(data)
  return (
    <div className="crouselSection lrPad">
      <div className="crouselWrapper contentWrapper">
        <span className="crouselTitle">Trending</span>
        <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
      </div>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default Trending;
