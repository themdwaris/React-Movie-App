import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import Recommendation from './carousels/Recommendation'
import Similar from './carousels/SmililarMovie'
import Cast from './cast/Cast'
import "./details.scss"
import DetailsBanner from './detailsBanner/DetailsBanner'
import VideosSection from './videoSection/VideoSection'

const Details = () => {
  const {mediaType,id} = useParams()
  const {loading,data} = useFetch(`/${mediaType}/${id}/videos`)
  const {loading:creditsLoading,data:credits} = useFetch(`/${mediaType}/${id}/credits`)
  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>
      <Cast data={credits?.cast} loading={creditsLoading}/>
      <VideosSection data={data} loading={loading}/>
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
} 

export default Details