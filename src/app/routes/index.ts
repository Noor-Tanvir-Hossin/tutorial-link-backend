
import { Router } from "express"



const router= Router()

// router.use('/users', UserRoutes)
// router.use('/students', StudentRoutes)



const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/blogs',
        route: blogRoutes
    },
    

]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router