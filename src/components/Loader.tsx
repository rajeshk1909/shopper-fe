"use client"

import React, { forwardRef, useRef } from "react"
import { FaRegCircleUser } from "react-icons/fa6"
import { FaNodeJs, FaServer, FaDatabase } from "react-icons/fa"
import Logo from "../../public/next.svg"

import { cn } from "@/lib/utils"
import { AnimatedBeam } from "@/components/animated-beam"
import Image from "next/image"

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}>
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

const Loader = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  //   const div1Ref = useRef<HTMLDivElement>(null)
  const div2Ref = useRef<HTMLDivElement>(null)
  const div3Ref = useRef<HTMLDivElement>(null)
  const div4Ref = useRef<HTMLDivElement>(null)
  const div5Ref = useRef<HTMLDivElement>(null)
  const div6Ref = useRef<HTMLDivElement>(null)
  const div7Ref = useRef<HTMLDivElement>(null)

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full items-center my-10 justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className
      )}
      ref={containerRef}>
      <div className='flex size-full max-w-lg flex-row items-stretch justify-between gap-10'>
        <div className='flex flex-col justify-center'>
          <Circle ref={div7Ref}>
            <FaRegCircleUser className='text-gray-700' size={40} />
          </Circle>
        </div>
        <div className='flex flex-col justify-center'>
          <Circle ref={div6Ref} className='size-16'>
            <Image src={Logo} alt='Next.js Logo' height={40} width={40} />
          </Circle>
        </div>
        <div className='flex flex-col justify-center gap-2'>
          <Circle ref={div2Ref}>
            <FaNodeJs className='text-green-500' size={40} />
          </Circle>
          <Circle ref={div3Ref}>
            <FaServer className='text-blue-600' size={40} />
          </Circle>
          <Circle ref={div4Ref}>
            <FaDatabase className='text-green-600' size={40} />
          </Circle>
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  )
}

export default Loader
