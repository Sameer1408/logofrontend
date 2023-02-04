import React from 'react'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from "./Page3"

function Pages({selectedBtn,showAlret}) {
  return (
    <div>
         {selectedBtn==1?<Page1 showAlret={showAlret}/>:null}
         {selectedBtn==2?<Page2/>:null}
         {selectedBtn==3?<Page3/>:null}
         {/* {selectedBtn==1?<Page2/>:null} */}
    </div>
  )
}

export default Pages