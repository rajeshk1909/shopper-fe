import Banner from "@/components/AutoSlider"
import Marquee from "@/components/marquee"
import categories, { categoriesTypes } from "@/const/categories"
import Image from "next/image"
import React from "react"

const Home = () => {
  return (
    <div>
      <Banner />
      <div className='mx-[10%]'>
        <Marquee>
          {categories.map((item: categoriesTypes, index: number) => (
            <div
              key={index}
              className='flex w-[300px] hover:cursor-pointer justify-between text-sm p-5 rounded-xl border bg-white shadow-sm hover:scale-105 duration-500 transition-all border-gradient-to-r from-gray-300 to-gray-100'>
              <div className='flex items-center justify-center gap-5'>
                <div className='h-14 w-14 bg-gray-100 rounded-md flex items-center justify-center'>
                  <Image
                    src={item.imgSrc}
                    alt={item.altText}
                    className='h-8 w-8'
                  />
                </div>
                <div className=''>
                  <p className='font-semibold text-gray-800'>{item.title}</p>
                  <button className='text-sm font-medium text-red-500 hover:text-red-600 transition-all'>
                    Show All
                  </button>
                </div>
              </div>
              <p className='text-gray-500 text-xs'>{`(${item.amount})`}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  )
}

export default Home
