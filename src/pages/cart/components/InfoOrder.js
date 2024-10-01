import { Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material'
import React, { useEffect } from 'react'
import { paymentMethods } from '../../../enums/enum'
import { getDistricts, getProvinces, getWards } from '../../../api/addressApi'
import { notifyError } from '../../../common/toastNotify/toastNotify'
import ReplyIcon from '@mui/icons-material/Reply';

export default function InfoOrder({ checkout, setIsContinuted, handleProccessingOrder }) {
    const [province, setProvince] = React.useState(null)

    const [district, setDistrict] = React.useState(null)
    const [ward, setWard] = React.useState(null)

    const [provinces, setProvinces] = React.useState([])
    const [districts, setDistricts] = React.useState([])
    const [wards, setWards] = React.useState([])

    const [phone, setPhone] = React.useState("")
    const [fullName, setFullName] = React.useState("")
    const [detailAddress, setDetailAddress] = React.useState("")
    const [paymentMethod, setPaymentMethod] = React.useState("CASH_ON_DELIVERY")
    const handleInfoOrder = () => {
        if (fullName === "") {
            notifyError("FullName is required")
        }
        else if (phone === "") {
            notifyError("Phone is required")
        } else if (province === null) {
            notifyError("Province is required")
        } else if (district === null) {
            notifyError("District is required")
        } else if (ward === null) {
            notifyError("Ward is required")
        }
        else if (detailAddress === "") {
            notifyError("Detail address is required")
        }
        else {
            const shippingAddress = detailAddress + ", " + wards.find(w => w.id === ward).name + ", " + districts.find(d => d.id === district).name + ", " + provinces.find(p => p.id === province).name
            handleProccessingOrder({ phone, fullName, shippingAddress, paymentMethod })
        }
    }
    useEffect(() => {
        (async () => {
            const res = await getProvinces();
            setProvinces(res)
        })();
    }, [])
    const handleChangeProvince = async (event) => {
        const idProvince = event.target.value
        setProvince(idProvince);
        setDistrict(null)
        setDistricts([])
        setWard(null)
        setWards([])
        const res = await getDistricts(idProvince);
        setDistricts(res);
    }
    const handleChangeDistrict = async (event) => {
        const idDistrict = event.target.value
        setDistrict(idDistrict);
        setWard(null)
        setWards([])
        const res = await getWards(idDistrict);
        setWards(res);
    }
    // useEffect(() => {
    //     setWards([])
    // }, [province])
    return (
        <Grid container >
            <Grid xs={5.7} md={7.5} >
                <div>
                    <h1 className='font-bold text-[22px]'>Thông tin giao hàng</h1>
                    <Divider />
                    <div className='mb-2'>
                        <label className='block mt-1' htmlFor='fullNameorder'>FullName</label>
                        <input onChange={(e) => setFullName(e.target.value)} value={fullName} placeholder='Input fullName' id="fullNameorder" className='border w-full px-3 py-2' />
                    </div>
                    <div className='mb-2'>
                        <label className='block mt-1' htmlFor='phoneorder'>Phone</label>
                        <input type='number' onChange={(e) => setPhone(e.target.value)} value={phone} placeholder='Input phone' id="phoneorder" className='border w-full px-3 py-2' />
                    </div>

                    <div className='flex justify-between mb-2'>
                        <FormControl variant="standard" sx={{ minWidth: 200 }}>

                            <InputLabel id="provinceChoose">Choose province</InputLabel>
                            <Select
                                labelId="provinceChoose"
                                id="demo-simple-province"
                                label="Số lượng"
                                autoWidth={true}
                                value={province}
                                onChange={handleChangeProvince}
                            >
                                {provinces.map((province) => (

                                    <MenuItem className='w-[200px]' value={province.id}>{province.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ minWidth: 200 }}>

                            <InputLabel id="districtChoose">Choose district</InputLabel>
                            <Select
                                labelId="districtChoose"
                                id="demo-simple-district"
                                label="Số lượng"
                                autoWidth={true}
                                value={district}
                                onChange={handleChangeDistrict}
                            >
                                {districts.map((district) => (

                                    <MenuItem className='w-[200px]' value={district.id}>{district.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" sx={{ minWidth: 200 }}>

                            <InputLabel id="wardChoose">Choose ward</InputLabel>
                            <Select
                                labelId="wardChoose"
                                id="demo-simple-ward"
                                label="Số lượng"
                                autoWidth={true}
                                value={ward}
                                onChange={(e) => setWard(e.target.value)}
                            >
                                {wards.map((ward) => (

                                    <MenuItem className='w-[200px]' value={ward.id}>{ward.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='mb-2'>
                        <label className='block mt-1' htmlFor='fullNameorder'>House number, village</label>
                        <input placeholder='Detail adress' id="detailAddress" className='border w-full px-3 py-2' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label className='block mt-1' htmlFor='fullNameorder'>Phương thức thanh toán</label>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            name="radio-buttons-group"
                        >
                            {paymentMethods.map((paymentMethod) => (
                                <FormControlLabel value={paymentMethod.value} control={<Radio />} label={paymentMethod.name} />
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </Grid>
            <Grid xs={6} md={4} className="pl-3">
                <h1 className='font-bold text-[22px]'>Thông tin đơn hàng</h1>
                <Divider />
                <div className='mb-10'>
                    <div className='flex justify-between items-center mt-2'>
                        <h1 >Tạm tính:</h1>
                        <span className='font-bold  '>{checkout.totalPrice.toLocaleString('de-DE')}đ</span>
                    </div>
                    <div className='flex justify-between items-center mt-2'>
                        <h1 >Giảm giá:</h1>
                        <span className='font-bold  '>{checkout.discount.toLocaleString('de-DE')}đ</span>
                    </div>
                    <div className='flex justify-between items-center my-2'>
                        <h1 >Phí vận chuyển:</h1>
                        <span className='font-bold  '>0đ</span>
                    </div>
                    <Divider />
                    <div className='flex justify-between items-center'>
                        <h1 >Tổng tiền:</h1>
                        <span className='font-bold  '>{checkout.paymentFee.toLocaleString('de-DE')}đ</span>
                    </div>
                    <div className='flex items-center flex-col'>
                        <button onClick={handleInfoOrder} className=' w-full my-5 border px-6 py-2 bg-black text-white font-bold'>Thanh toán ngay</button>
                        <button onClick={() => setIsContinuted(false)} > <ReplyIcon /> Back to cart</button>
                    </div>

                </div>
                <Divider />
            </Grid>
        </Grid>
    )
}
