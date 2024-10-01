import React, { useEffect } from 'react'
import { Slide, Zoom } from 'react-slideshow-image';
import { Description } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { Backdrop, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Breadcrumbsv from '../../../../common/breadcrumbsv/Breadcrumbsv';
import BackdropProductSizeColor from './components/BackdropProductSizeColor';
import convertMoney from '../../../../utils/convertMoney';
import { getProductDetailAdmin } from '../../../../api/productSerivce';
import { notifyError } from '../../../../common/toastNotify/toastNotify';
import Loading from '../../../../common/loading/Loading';
const links = {
  'Home': '/admin/dashboard',
  'Products': '/admin/products',
  'Product details': '#'

}
const product2 = {
  name: 'Product name',
  price: 100000,
  subCategory: 'Category',
  brand: 'Adidas',
  detailProduct: {
    description: "lorem ipsum dolor sit amet, lorem dasvcx, lorem ipsum dolor sit amet, lorem dasvcx, lorem ipsum dolor sit amet, lorem dasvcx, lorem ipsum dolor sit amet, lorem dasvcx,lorem ipsum dolor sit amet, lorem dasvcx,lorem ipsum dolor sit amet, lorem dasvcxlorem ipsum dolor sit amet, lorem dasvcx",
    material: "vai thua",
    origin: "Vietnam",
    warranty: "12 months",
    madeIn: "Vietnam",
    model: "2021",
    images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
  },
  sizes: [
    {
      "id": 6,
      "name": "L",
      "totalQuantity": 64,
      "totalSales": 11
    },
    {
      "id": 7,
      "name": "X",
      "totalQuantity": 55,
      "totalSales": 20
    },
    {
      "id": 8,
      "name": "XXL",
      "totalQuantity": 0,
      "totalSales": 0
    },
    {
      "id": 9,
      "name": "XL",
      "totalQuantity": 0,
      "totalSales": 0
    },
    {
      "id": 10,
      "name": "SSL",
      "totalQuantity": 0,
      "totalSales": 0
    }
  ]
}

export default function DetailProductAdmin() {
  const [open, setOpen] = React.useState(false);
  const [product, setProduct] = React.useState(null);
  const [size, setSize] = React.useState(null);
  const { id } = useParams();
  useEffect(() => {
    (async () => {
      try {
        const data = await getProductDetailAdmin(id);
        setProduct(data);
      } catch (err) {
        notifyError("Error occured")
      }
    })()
  }, [id])
  return (
    <>
      <Breadcrumbsv links={links} />
      <h1 className='font-bold text-[30px]'>Product details</h1>
      {product ?
        <div className='flex '>
          <div className='w-[40%]'>
            <Slide indicators={index => <div className="indicator">{index + 1}</div>} scale={1}>
              {/* <div className="each-slide-effect">
              <div style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80)'
              }}>
                <span>
                  Slide 1
                </span>
              </div>
            </div> */}
              {product.detailProduct.images.map((image, index) => (
                <div className="each-slide-effect" key={index}>
                  <div style={{
                    backgroundImage: `url(${image})`
                  }}>
                  </div>
                </div>
              )
              )}
            </Slide>
          </div>
          <div className='flex-grow px-4'>
            <div className='flex gap-5 justify-between'>
              <div className='text-[#575454]'>
                <h2 className='font-bold text-[18px]'>{product.name}</h2>
                <p><span className='font-bold'>Price:</span> {convertMoney(product.price)}</p>
                <p><span className='font-bold'>Category:</span> {product.subCategory}</p>
                <p><span className='font-bold'>Model:</span> {product.detailProduct.model}</p>
                <p><span className='font-bold'>Description:</span> {product.detailProduct.description}</p>

              </div>
              <div className='text-[#575454]'>
                <p><span className='font-bold'>Material:</span> {product.detailProduct.material}</p>
                <p><span className='font-bold'>Origin:</span> {product.detailProduct.origin}</p>
                <p><span className='font-bold'>Warranty:</span> {product.detailProduct.warranty}</p>
                <p><span className='font-bold'>Brand: </span>{product.brand}</p>
                <p><span className='font-bold'>Made in: </span>{product.detailProduct.madeIn}</p>
              </div>
            </div>
            <Divider className='py-2' />
            <div>
              <TableContainer component={Paper} className='mb-2'>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' sx={{ padding: "4px" }} >Name</TableCell>
                      <TableCell align='center' sx={{ padding: "4px" }} >Total quantity</TableCell>
                      <TableCell align='center' sx={{ padding: "4px" }} >Total sales</TableCell>
                      <TableCell align='center' sx={{ padding: "4px" }} >Total revenue</TableCell>
                      <TableCell align='center' sx={{ padding: "4px" }} >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      product.sizes.map((productSize, index) => (
                        <TableRow key={index}>
                          <TableCell align='center' sx={{ padding: "4px" }} >{productSize.name}</TableCell>
                          <TableCell align='center' sx={{ padding: "4px" }} >{productSize.totalQuantity}</TableCell>
                          <TableCell align='center' sx={{ padding: "4px" }} >{productSize.totalSales}</TableCell>
                          <TableCell align='center' sx={{ padding: "4px" }} >{convertMoney(productSize.totalSales * product.price)}</TableCell>
                          <TableCell align='center' sx={{ padding: "4px" }} >
                            <button onClick={() => {
                              setSize(productSize);
                              setOpen(true);
                            }} className='bg-blue-500 text-white px-2 py-1 rounded-md'>Detail</button>
                            <button className='text-red-500 font-bold px-2 py-1 rounded-md hover:text-white ml-2 hover:bg-red-500'>Delete</button>
                          </TableCell>
                        </TableRow>
                      ))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
              <BackdropProductSizeColor open={open} setOpen={setOpen} size={size} />
            </div>
          </div>
        </div>
        : <div className='h-[70vh]'>
          <Loading />
        </div>}
    </>
  )
}
