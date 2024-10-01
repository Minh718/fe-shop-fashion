import React from 'react'

export default function Footer() {
    return (
        <div className='bg-black text-white'>
            <footer className="py-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                            <h2 className="text-lg font-semibold mb-4">ĐĂNG KÍ NHẬN TIN</h2>
                            <form className="flex">
                                <input type="email" placeholder="Email" className="p-2 rounded-l bg-gray-700 text-white" />
                                <button className="bg-gray-900 p-2 rounded-r">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h4m0 0V6m0 4v4m4-4h4m0 0V6m0 4v4m4-4h4m0 0V6m0 4v4m0 4H3" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                            <h2 className="text-lg font-semibold mb-4">GIỚI THIỆU</h2>
                            <p>160STORE - Chuỗi Phân Phối Thời Trang Nam Chuẩn Hiệu</p>
                            <p className="mt-2">📞 02871006789</p>
                            <p>📧 cs@160store.com</p>
                            <p>🕒 Giờ mở cửa : 08:30 - 22:00</p>
                            <img src="path/to/verified-badge.png" alt="ĐÃ THÔNG BÁO" className="mt-4" />
                        </div>
                        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                            <h2 className="text-lg font-semibold mb-4">CHÍNH SÁCH</h2>
                            <ul>
                                <li><a href="#" className="hover:underline">Hướng dẫn đặt hàng</a></li>
                                <li><a href="#" className="hover:underline">Thông tin chuyển khoản</a></li>
                                <li><a href="#" className="hover:underline">Chính sách</a></li>
                            </ul>
                        </div>
                        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
                            <h2 className="text-lg font-semibold mb-4">HỆ THỐNG 19 CỬA HÀNG</h2>
                            <ul>
                                <li><span className="font-semibold">HỒ CHÍ MINH (10 CH)</span></li>
                                <li>297/3 Tô Hiến Thành, Phường 13, Quận 10, TP Hồ Chí Minh</li>
                                <li className="mt-2"><span className="font-semibold">HÀ NỘI (2 CH)</span></li>
                                <li>Số 26 phố Lê Đại Hành, Phường Lê Đại Hành, Quận Hai Bà Trưng, TP Hà Nội</li>
                                <li className="mt-2"><span className="font-semibold">CẦN THƠ (2 CH)</span></li>
                                <li>Số 35 Trần Phú, Phường Cái Khế, Quận Ninh Kiều, TP Cần Thơ, Cần Thơ</li>
                            </ul>
                            <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">XEM TẤT CẢ CỬA HÀNG</a>
                        </div>
                    </div>
                    <div className="mt-10 flex justify-between items-center">
                        <div className="flex space-x-4">
                            <a href="#" className="text-blue-500 hover:text-blue-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.83.656-2.828.775 1.017-.611 1.798-1.577 2.165-2.724-.951.555-2.005.959-3.127 1.184-.897-.956-2.178-1.555-3.594-1.555-2.723 0-4.928 2.205-4.928 4.928 0 .386.044.762.128 1.124-4.094-.205-7.725-2.165-10.148-5.144-.424.728-.667 1.573-.667 2.475 0 1.708.869 3.216 2.188 4.099-.807-.026-1.566-.248-2.228-.616v.062c0 2.386 1.698 4.374 3.946 4.828-.413.113-.849.174-1.296.174-.317 0-.626-.03-.927-.087.627 1.956 2.445 3.379 4.604 3.419-1.68 1.318-3.8 2.105-6.102 2.105-.397 0-.788-.023-1.175-.068 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14.002-7.496 14.002-14.002 0-.213-.005-.425-.014-.636.96-.693 1.797-1.56 2.457-2.548l-.047-.02z" />
                                </svg>
                            </a>
                            <a href="#" className="text-red-500 hover:text-red-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.499 6.203a3.012 3.012 0 0 0-2.118-2.121c-1.871-.502-9.378-.502-9.378-.502s-7.507 0-9.378.502a3.014 3.014 0 0 0-2.118 2.121C.005 8.076.005 12 0 12s0 3.924.507 5.797a3.013 3.013 0 0 0 2.118 2.121c1.871.502 9.378.502 9.378.502s7.507 0 9.378-.502a3.012 3.012 0 0 0 2.118-2.121C24 15.924 24 12 24 12s0-3.924-.501-5.797zM9.754 15.571V8.429L15.768 12l-6.014 3.571z" />
                                </svg>
                            </a>
                            <a href="#" className="text-pink-500 hover:text-pink-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.004 7.799c1.486 0 1.665.008 2.252.032.47.02.94.104 1.368.232.311.092.586.207.847.368.277.176.501.399.676.676.16.261.276.536.368.847.128.428.212.898.232 1.368.024.586.032.766.032 2.252s-.008 1.665-.032 2.252c-.02.47-.104.94-.232 1.368-.092.311-.207.586-.368.847-.176.277-.399.501-.676.676-.261.16-.536.276-.847.368-.428.128-.898.212-1.368.232-.586.024-.766.032-2.252.032s-1.665-.008-2.252-.032c-.47-.02-.94-.104-1.368-.232-.311-.092-.586-.207-.847-.368-.277-.176-.501-.399-.676-.676-.16-.261-.276-.536-.368-.847-.128-.428-.212-.898-.232-1.368-.024-.586-.032-.766-.032-2.252s.008-1.665.032-2.252c.02-.47.104-.94.232-1.368.092-.311.207-.586.368-.847.176-.277.399-.501.676-.676.261-.16.536-.276.847-.368.428-.128.898-.212 1.368-.232.586-.024.766-.032 2.252-.032zM12.004 5.5c-1.518 0-1.716.008-2.31.034-.598.027-1.006.123-1.41.258-.362.122-.668.285-.976.593-.308.308-.471.614-.593.976-.135.404-.231.812-.258 1.41-.026.594-.034.792-.034 2.31s.008 1.716.034 2.31c.027.598.123 1.006.258 1.41.122.362.285.668.593.976.308.308.614.471.976.593.404.135.812.231 1.41.258.594.026.792.034 2.31.034s1.716-.008 2.31-.034c.598-.027 1.006-.123 1.41-.258.362-.122.668-.285.976-.593.308-.308.471-.614.593-.976.135-.404.231-.812.258-1.41.026-.594.034-.792.034-2.31s-.008-1.716-.034-2.31c-.027-.598-.123-1.006-.258-1.41-.122-.362-.285-.668-.593-.976-.308-.308-.614-.471-.976-.593-.404-.135-.812-.231-1.41-.258-.594-.026-.792-.034-2.31-.034zm0 4.505c-1.376 0-2.499 1.123-2.499 2.499 0 1.376 1.123 2.499 2.499 2.499s2.499-1.123 2.499-2.499c0-1.376-1.123-2.499-2.499-2.499zm5.515-1.292c-.3 0-.595.114-.819.338a1.158 1.158 0 0 0-.338.819c0 .3.114.595.338.819.224.224.519.338.819.338s.595-.114.819-.338c.224-.224.338-.519.338-.819 0-.3-.114-.595-.338-.819a1.158 1.158 0 0 0-.819-.338z" />
                                </svg>
                            </a>
                            <a href="#" className="text-blue-700 hover:text-blue-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.324 1.325 1.324h21.351c.733 0 1.324-.591 1.324-1.324v-21.351c0-.733-.591-1.325-1.324-1.325zm-14.048 20.053h-3.787v-9.648h3.787v9.648zm-1.893-11.064c-1.211 0-2.191-.979-2.191-2.191s.979-2.191 2.191-2.191c1.212 0 2.191.979 2.191 2.191 0 1.212-.979 2.191-2.191 2.191zm14.28 11.064h-3.787v-4.816c0-1.149-.024-2.625-1.601-2.625-1.602 0-1.846 1.251-1.846 2.543v4.897h-3.787v-9.648h3.637v1.317h.049c.507-.961 1.746-1.976 3.595-1.976 3.842 0 4.546 2.529 4.546 5.817v4.491z" />
                                </svg>
                            </a>
                        </div>
                        <div className="flex space-x-4">
                            <img src="path/to/mastercard.png" alt="Mastercard" className="h-8" />
                            <img src="path/to/apple-pay.png" alt="Apple Pay" className="h-8" />
                            <img src="path/to/vnpay.png" alt="VNPay" className="h-8" />
                            <img src="path/to/cod.png" alt="COD" className="h-8" />
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <p>BẢN QUYỀN THUỘC VỀ 160STORE</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
