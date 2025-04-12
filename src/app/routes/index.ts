
import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { bookRoutes } from "../modules/book/book.route"
import { orderRoutes } from "../modules/order/order.route"
import authRouter from "../modules/auth/auth.route"



const router= Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/products',
        route: bookRoutes
    },
    {
        path: '/orders',
        route: orderRoutes
    },
    {
        path: '/auth',
        route: authRouter
    },

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router