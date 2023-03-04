import React, { useState } from "react";
import Crousel from "../../../components/carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import "../../../components/switchTabs/switchTabs.scss"
import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
    const [endpoint,setEndPoint] = useState("movie")
    const {loading,data} = useFetch(`/${endpoint}/top_rated`)
  const onTabChange = (tab) => {
    setEndPoint(tab==="Movies"?"movie":"tv")
  };
//   console.log(data)
  return (
    <div className="crouselSection lrPad">
      <div className="crouselWrapper contentWrapper">
        <span className="crouselTitle">Top Rated</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </div>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default TopRated;
