"use client"
import Navbar from "@/components/Navbar"
import React, { createContext, useEffect, useState } from "react"

type layoutProps = {
  children: React.ReactNode
}

const layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default layout
