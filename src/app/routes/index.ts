
import { Router } from "express"
import { UserRoutes } from "../modules/user/user.route"
import { bookRoutes } from "../modules/book/book.route"
import { orderRoutes } from "../modules/order/order.route"



const router= Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/api/products',
        route: bookRoutes
    },
    {
        path: '/order',
        route: orderRoutes
    },

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router