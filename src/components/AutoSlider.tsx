"use client"
import React, { useState, useEffect } from "react"
import image1 from "../../public/banner_mens.png"
import image2 from "../../public/banner_women.png"
import image3 from "../../public/banner_kids.png"
import Image from "next/image"

const images = [image1, image2, image3]

const AutoSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setCurrentIndex((prevIndex) => prevIndex + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (currentIndex === images.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentIndex(0)
      }, 700)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  return (
    <div className='flex items-center justify-center w-full'>
      <div className=' relative rounded-xl overflow-hidden md:my-10 my-5 w-[80%] '>
        <div
          className={`flex ${
            isTransitioning
              ? "transition-transform duration-700 ease-in-out"
              : ""
          }`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className=''
            />
          ))}
          <Image src={images[0]} alt='Slide Clone' className='  ' />
        </div>
      </div>
    </div>
  )
}

export default AutoSlider
