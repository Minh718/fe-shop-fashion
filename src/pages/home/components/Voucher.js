import { Divider } from '@mui/material'
import React from 'react'
import { typeVouchers } from '../../../enums/enum';
import convertMoney from '../../../utils/convertMoney';

export default function Voucher({ voucher, copiedCode, setCopiedCode }) {
    const handleCopyCode = (code, e) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
    }
    return (
        <div className='shadow-xl rounded-[10px] overflow-hidden flex justify-center mt-2'>
            <div className=' bg-gray-300 p-2 flex flex-col items-center justify-center'>
                <span className='text-black font-bold italic'>{voucher.code}</span>
                {copiedCode === voucher.code ? <button className='border border-black text-[12px] mt-2 p-1 font-bold bg-black text-white'>Đã sao chép</button> : <button onClick={(e) => handleCopyCode(voucher.code, e)}
                    className={'border border-black text-[12px] mt-2 p-1 font-bold bg-white hover:text-white hover:bg-black transition-opacity'}>
                    Sao chép mã</button>}
            </div>
            <div className='p-4 bg-white text-[12px]'>
                <h3 className='text-xl font-bold text-slate-500 text-wrap max-w-[220px]'>{voucher.description}</h3>

                {voucher.type === typeVouchers.FIXED ? (
                    <>
                        <h3>Giảm {convertMoney(voucher.discount)}</h3>
                    </>
                ) : <div className='flex justify-between'>
                    <h3 className='mr-2'>Giảm {voucher.discount}%</h3>
                    <h6>Tối đa {convertMoney(voucher.maxDiscount)}</h6></div>}
                <h6>Đơn từ {convertMoney(voucher.minPrice)}</h6>
                <div>Mã: <b>{voucher.code}</b></div>
                <div>HSD: {voucher.endDate}</div>
            </div>
        </div>
    )
}
