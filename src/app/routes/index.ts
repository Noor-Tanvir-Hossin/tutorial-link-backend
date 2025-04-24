import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { orderRoutes } from '../modules/order/order.route';
import authRouter from '../modules/auth/auth.route';
import { TutorRoutes } from '../modules/tutor/tutor.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { SubjectRoutes } from '../modules/subject/subject.route';
import { bookingRoute } from '../modules/Booking/booking.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/booking',
    route: bookingRoute,
  },

  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/tutor',
    route: TutorRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/subject',
    route: SubjectRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
