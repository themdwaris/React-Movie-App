import React, { useState } from "react";
import Crousel from "../../../components/carousel/Carousel";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import "../../../components/switchTabs/switchTabs.scss"
import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint,setEndPoint] = useState("movie")
    const {loading,data} = useFetch(`/${endpoint}/popular`)
  const onTabChange = (tab) => {
    setEndPoint(tab==="Movies"?"movie":"tv")
  };
//   console.log(data)
  return (
    <div className="crouselSection lrPad">
      <div className="crouselWrapper contentWrapper">
        <span className="crouselTitle">What's Popular</span>
        <SwitchTabs data={["Movies", "Tv Shows"]} onTabChange={onTabChange} />
      </div>
      <Crousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  );
};

export default Popular;
