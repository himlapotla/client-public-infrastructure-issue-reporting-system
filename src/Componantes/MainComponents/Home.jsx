import React from 'react'
import Baner from './Baner'
import Features from './Features'
import Work from './Work'
import Transparency from './Transparency'
import CallToActin from './CallToActin'
import LatestIssue from './LatestIssue'

const Home = () => {
  return (
    <div className='w-11/12 mx-auto'>
        <Baner> </Baner>

        <LatestIssue> </LatestIssue>

        <Features> </Features>

        <Work> </Work>

        <Transparency> </Transparency>

        <CallToActin> </CallToActin> 
    </div>
  )
}

export default Home