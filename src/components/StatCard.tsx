import { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
}: StatCardProps) {
  const isPositiveTrend = trend.startsWith("+")

  return (
    <div className='p-6 rounded-lg bg-white shadow-sm transition-transform duration-300 hover:shadow-lg hover:scale-105'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-500'>{title}</p>
          <h3 className='text-3xl font-bold mt-2 text-gray-800'>{value}</h3>
          <div className='flex items-center mt-2'>
            <span
              className={`text-sm font-medium ${
                isPositiveTrend ? "text-green-500" : "text-red-500"
              }`}>
              {isPositiveTrend ? "▲" : "▼"} {trend} from last month
            </span>
          </div>
        </div>
        <div className='h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center'>
          <Icon className='h-6 w-6 text-indigo-600' />
        </div>
      </div>
    </div>
  )
}
