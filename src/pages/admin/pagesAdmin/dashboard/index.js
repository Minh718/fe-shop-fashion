import React, { useEffect, useState } from 'react'
import MoneyIcon from '@mui/icons-material/Money';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { WidthFull } from '@mui/icons-material';
import { Slide, Zoom } from 'react-slideshow-image';
import BoxStatistic from './components/BoxStatistic';
import { getStatisticsDashboard } from '../../../../api/statisticApi';
// Register the necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const typeStatistics = [
  {
    name: "Last 24 hours",
    value: "DAY"
  },
  {
    name: "Last week",
    value: "WEEK"
  },
  {
    name: "Last month",
    value: "MONTH"
  },
  {
    name: "Last year",
    value: "YEAR"
  },
]
const data = {
  labels: [],
  datasets: [
    {
      label: 'Sales (k VNĐ)',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true,
    },
  ],
};
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Sales Summary',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value; // Add a dollar sign before the value
        },
      },
    },
  },
};
export default function DashboardPage() {
  const [totalOrders, setTotalOrders] = useState({ value: 0, percent: -1 });
  const [totalRevenue, setTotalRevenue] = useState({ value: 0, percent: 2 });
  const [totalQuantity, setTotalQuantity] = useState({ value: 0, percent: 0 });
  const [totalNewCustommers, setTotalNewCustommers] = useState({ value: 0, percent: 0 });
  const [dataChart, setDataChart] = useState(data);
  const [typeStatistic, setTypeStatistic] = useState(typeStatistics[2]);

  useEffect(() => {
    (async () => {
      const res = await getStatisticsDashboard(typeStatistic.value);
      console.log(res)
      if (res) {
        setTotalOrders(res.totalOrders);
        setTotalRevenue(res.totalRevenue);
        setTotalQuantity(res.totalQuantity);
        setTotalNewCustommers(res.totalNewCustommers);
        const labels = res.dataChart.map((item) => item.time);
        const data = res.dataChart.map((item) => item.revenue);
        setDataChart({ labels, datasets: [{ ...dataChart.datasets[0], data }] })
      }
    })();
  }, [typeStatistic.value])
  return (
    <>

      <div className='flex'>
        {typeStatistics.map((type) => (
          <div onClick={() => setTypeStatistic(type)} className={`${typeStatistic.value === type.value ? "text-blue-700 border-b-2 border-blue-700" : " "} transition-all font-medium cursor-pointer px-3 pb-2 text-[14px]`}>
            {type.name}
          </div>
        ))}
      </div>
      <div>
        <div className='flex gap-3 py-4'>
          <BoxStatistic data={totalRevenue} typeStatistic={typeStatistic} name={<><MoneyIcon /> <span className='pl-2'>Total Revennue ($)</span></>} />
          <BoxStatistic data={totalNewCustommers} typeStatistic={typeStatistic} name={<><GroupIcon /> <span className='pl-2'>Total New Customers</span></>} />
          <BoxStatistic data={totalOrders} typeStatistic={typeStatistic} name={<><PlaylistAddCheckIcon /> <span className='pl-2'>Total Orders</span></>} />
          <BoxStatistic data={totalQuantity} typeStatistic={typeStatistic} name={<><InventoryIcon /> <span className='pl-2'>Total Products</span></>} />

        </div>
        <div className='flex justify-center w-full max-h-[500px] h-max bg-white p-2'>
          <Line data={dataChart} options={options} />
        </div>
      </div>
    </>

  )
}
