"use client"
import { StatCard } from "@/components/StatCard"
import { RevenueChart } from "@/components/RevenueChart"
import { statsData } from "@/const/statsData"
import React from "react"

const AdminDashboard : React.FC = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-gray-100 to-gray-200'>

      <main className='p-8'>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>
          {statsData.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              trend={stat.trend}
            />
          ))}
        </div>

        <div className='bg-white rounded-lg shadow-md p-6'>
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Revenue Overview
          </h2>
          <RevenueChart />
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard