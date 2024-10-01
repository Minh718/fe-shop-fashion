import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Voucher from './components/Voucher';
import ProductsHomePage from './components/ProductsHomePage';
import { getUserVouchers } from '../../api/voucherService';
import { Slideshow } from './components/Slideshow';


export default function HomePage() {
  const [copiedCode, setCopiedCode] = React.useState(null);
  const [vouchers, setVouchers] = React.useState([]);
  const listProductsForHomePage = useLoaderData();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const res = await getUserVouchers({ page: 0, size: 3 });
        setVouchers(res)
      })();
    }
  }, [isAuthenticated])
  return (
    <>
      <Slideshow />
      {isAuthenticated ? <div className='p-12 bg-black'>
        <h1 className='text-center font-bold text-[26px] pb-2 text-white'>Ưu đãi cho bạn</h1>
        <div className='flex items-center justify-center'>
          <div className='flex w-[90%] max-w-[1100px] justify-around flex-wrap'>

            {vouchers.map((voucher, index) => {
              return (
                <Voucher voucher={voucher} key={index} copiedCode={copiedCode} setCopiedCode={setCopiedCode} />
              )
            })}
          </div>
        </div>
      </div> : ""}
      {
        listProductsForHomePage?.map((item, index) => (
          <ProductsHomePage products={item.products} index={index} key={index} name={item.name} />
        ))
      }
    </>
  )
}
