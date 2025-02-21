import React from 'react'
import errorimg from "./../../assets/images/error.svg"
function Error() {
  return (
    <>
     <div className="w-1/2 mx-auto p-7 mt-20">
      <img src={errorimg} alt="errorimg" className='w-full' />
    </div>
    </>
   
  )
}

export default Error
