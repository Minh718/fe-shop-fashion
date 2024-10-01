import React from 'react'
import MoneyIcon from '@mui/icons-material/Money';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export default function BoxStatistic({ data, typeStatistic, name }) {
    return (
        <div className='flex-grow bg-white rounded-lg p-4 shadow-md'>
            <div className='pb-2'>{name}</div>
            <div className='flex justify-between'>
                <div className='text-3xl font-semibold'>{data.value}</div>
                <div className='text-[12px] flex flex-col items-center'>
                    {data.percent >= 0 ? <div className='text-green-700 flex text-[14px] items-center'>
                        <TrendingUpIcon fontSize='small' />
                        <div className='pl-1 font-bold'> {data.percent.toFixed(2)}%</div>
                    </div> : <div className='text-red-700 flex items-center'>
                        <TrendingDownIcon fontSize='small' />
                        <div className='pl-1 font-bold'> {data.percent.toFixed(2)}%</div>
                    </div>}
                    <div>Vs <span className='lowercase'>{typeStatistic.name}</span></div>
                </div>
            </div>
        </div>
    )
}
