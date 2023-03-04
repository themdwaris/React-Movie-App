import { useEffect } from "react";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { fetchFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import Page404 from "./pages/404/Page404";
import Details from "./pages/details/Details";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    apiConfig();
    genresCall()
  }, []);

  const apiConfig = () => {
    fetchFromApi("/configuration").then((res) => {
      // console.log(res);
      const url = {
        backdrop: res.images.secure_base_url+"original",
        poster: res.images.secure_base_url+"original",
        profile: res.images.secure_base_url+"original"
      }
      dispatch(getApiConfiguration(url));
    });
  };

  const genresCall = async() =>{
    const promises =[]
    const endPoints = ["movie","tv"]
    const allGenres={}

    endPoints.forEach((url)=>{
      promises.push(fetchFromApi(`/genre/${url}/list`))
    })
    const data = await Promise.all(promises)
    data.map(({genres})=>{
      return genres?.map((item)=>{
        // console.log(item)
        return (allGenres[item?.id]=item)
      })
    })

    dispatch(getGenres(allGenres))
  }

  return (
   <BrowserRouter>
   <Header/>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/search/:query" element={<SearchResult/>}/>
      <Route path="/:mediaType/:id" element={<Details/>}/>
      <Route path="/explore/:mediaType" element={<Explore/>}/>
      <Route path="*" element={<Page404/>}/>
    </Routes>
    <Footer/>
   </BrowserRouter>
  );
}

export default App;
