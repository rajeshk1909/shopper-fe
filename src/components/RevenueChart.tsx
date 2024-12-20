"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 700 },
  { name: "Jun", value: 900 },
]

export function RevenueChart() {
  return (
    <div className='p-6'>
      <h2 className='text-lg font-semibold mb-4'>Revenue Overview</h2>
      <div className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='colorValue' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='hsl(var(--primary))'
                  stopOpacity={0.3}
                />
                <stop
                  offset='95%'
                  stopColor='hsl(var(--primary))'
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray='3 3' className='stroke-muted' />
            <XAxis dataKey='name' className='text-sm' />
            <YAxis className='text-sm' />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Area
              type='monotone'
              dataKey='value'
              stroke='hsl(var(--primary))'
              fillOpacity={1}
              fill='url(#colorValue)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
