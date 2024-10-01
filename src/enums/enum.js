import PaymentIcon from '@mui/icons-material/Payment';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
export const paymentMethods = [
    {
        value: "VNPAY",
        name: (
            <>
                <PaymentIcon /> VNPAY payment
            </>
        ),
    },
    {
        value: "CASH_ON_DELIVERY",
        name: (
            <>
                <HandshakeIcon /> Cash on Delivery (COD)
            </>
        ),
    },
    //  {
    //     value: "BANK_TRANSFER",
    //     name: (
    //         <>
    //             <AccountBalanceIcon /> Bank Transfer
    //         </>
    //     ),
    // },
    // You can add more payment methods here
];
export const paymentMethodEnum = {
    VNPAY: "VNPAY",
    "CASH_ON_DELIVERY": "CASH_ON_DELIVERY",

};


export const OrderStatus = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    CANCELED: "CANCELED",
}
export const OrderStatusArr = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELED"
];
export const ShippingStatus = {
    NOT_SHIPPED: "NOT_SHIPPED",
    IN_TRANSIT: "IN_TRANSIT",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    RETURNED: "RETURNED",
}

export const typeVouchers = {
    PERCENT: "PERCENT",
    FIXED: "FIXED"
}


const sidebar = {
    dashboard: {
        name: "Dashboard",
    },
    products: {
        name: "Products",
        subMenus: {
            listProducts: {
                name: "List Products",
            },
            addProduct: {
                name: "Add Product",
            },
            categories: {
                name: "Categories",
            },
        },
    },
    orders: {
        name: "Orders",
        subMenus: {
            listOrders: {
                name: "List Orders",
            },
        },
    },
    customers: {
        name: "Customers",
        subMenus: {
            listCustomers: {
                name: "List Customers",
            },
        },
    },
    vouchers: {
        name: "Vouchers",
        subMenus: {
            listVouchers: {
                name: "List Vouchers",
            },
            addVoucher: {
                name: "Add Voucher",
            },
        },
    },
    settings: {
        name: "Settings",
        subMenus: {
            general: {
                name: "General",
            },
        },
    },

}

export const typeStatisticEnum = {
    DAY: "DAY",
    MONTH: "MONTH",
    WEEK: "WEEK",
    YEAR: "YEAR"
}

const nameBoxStatistic = {
    "REVENUE": <><MoneyIcon /> <span className='pl-3'>Total Revennue</span>
    </>
}