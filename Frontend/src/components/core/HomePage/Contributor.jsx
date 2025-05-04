import React from 'react'
import foodCart from "../../../assets/foodCart.png"
import doodhMan from "../../../assets/doodhman.png";

const Contributor = () => {
  return (
    <div className="relative w-full h-screen flex justify-center items-center">
      <div className="w-1/2 ">
        <img className=" ml-48 w-auto h-[30rem] object-cover"  src={doodhMan} alt="doodhman" />
      </div>

      <div className="w-1/2 h-full">
        <img className="w-full h-full object-cover" src={foodCart} alt="foodCartImg" />
      </div>
    </div>
  )
}

export default Contributor
