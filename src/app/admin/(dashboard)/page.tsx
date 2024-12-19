import React from "react"

// Placeholder for data chart (you can integrate libraries like Chart.js or Recharts later)
const ChartCard = () => {
  return (
    <div className='bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between h-full'>
      <div className='text-2xl font-semibold'>Revenue Chart</div>
      <div className='h-32 bg-gray-200 mt-4 rounded-lg'>
        [Chart Placeholder]
      </div>
      <div className='text-sm mt-4 text-gray-500'>
        See the revenue growth over time.
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  return (
    <div className='flex flex-col p-8 bg-gray-50'>
      {/* Dashboard Header */}
      <header className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-blue-900'>Admin Dashboard</h1>
        <p className='text-gray-600 mt-2'>
          Overview of key metrics and performance
        </p>
      </header>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
        {/* Card 1 - Users */}
        <div className='bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105'>
          <div className='text-3xl font-bold text-blue-600'>500</div>
          <div className='text-lg text-gray-700'>Active Users</div>
          <div className='mt-4 text-sm text-gray-500'>
            Monitor the activity of your platform users
          </div>
        </div>

        {/* Card 2 - Products */}
        <div className='bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105'>
          <div className='text-3xl font-bold text-green-600'>120</div>
          <div className='text-lg text-gray-700'>Products</div>
          <div className='mt-4 text-sm text-gray-500'>
            Manage and track product inventory
          </div>
        </div>

        {/* Card 3 - Orders */}
        <div className='bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105'>
          <div className='text-3xl font-bold text-orange-600'>80</div>
          <div className='text-lg text-gray-700'>New Orders</div>
          <div className='mt-4 text-sm text-gray-500'>
            Review recent orders and manage fulfillment
          </div>
        </div>
      </div>

      {/* Data Visualization Section */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
        <div className='bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105'>
          <div className='text-2xl font-semibold'>Total Revenue</div>
          <div className='text-4xl font-bold text-blue-600 mt-4'>$24,000</div>
          <div className='text-sm mt-4 text-gray-500'>
            Current total revenue for the month
          </div>
        </div>

        <ChartCard />
      </div>

      {/* Progress Section */}
      <div className='mt-12'>
        <div className='text-2xl font-semibold text-blue-900'>
          Progress Overview
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6'>
          {/* Progress Card 1 */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center'>
              <div className='text-lg font-semibold text-gray-700'>
                Sales Target
              </div>
              <div className='text-blue-600 text-2xl'>75%</div>
            </div>
            <div className='mt-2 bg-blue-200 rounded-full h-2'>
              <div
                className='bg-blue-600 h-2 rounded-full'
                style={{ width: "75%" }}></div>
            </div>
          </div>

          {/* Progress Card 2 */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center'>
              <div className='text-lg font-semibold text-gray-700'>
                Customer Satisfaction
              </div>
              <div className='text-green-600 text-2xl'>90%</div>
            </div>
            <div className='mt-2 bg-green-200 rounded-full h-2'>
              <div
                className='bg-green-600 h-2 rounded-full'
                style={{ width: "90%" }}></div>
            </div>
          </div>

          {/* Progress Card 3 */}
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <div className='flex justify-between items-center'>
              <div className='text-lg font-semibold text-gray-700'>
                Orders Fulfilled
              </div>
              <div className='text-orange-600 text-2xl'>65%</div>
            </div>
            <div className='mt-2 bg-orange-200 rounded-full h-2'>
              <div
                className='bg-orange-600 h-2 rounded-full'
                style={{ width: "65%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
