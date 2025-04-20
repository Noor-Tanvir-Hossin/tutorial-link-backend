import { Booking } from './booking.model';
import { IBooking, IBookingFilters } from './booking.interface';
import { Tutor } from '../tutor/tutor.model';
import { Order } from '../order/order.model';


//   const createBookingIntoDb= async (payload: IBooking) => {
//     const booking = await Booking.create({ ...payload, status: 'pending' });
//     return booking;
//   }


  const createBookingIntoDb = async (payload: IBooking) => {
    const tutor = await Tutor.findById(payload.tutor);
    if (!tutor) {
      throw new Error("Tutor not found");
    }

    const { selectedMonths, selectedHours, student } = payload;

    // Calculate total hours (Assuming 4 weeks in a month)
    const totalHours = selectedHours * 4 * selectedMonths;

    // Calculate total price for the student (tutor's hourly rate * total hours)
    const totalPrice = tutor.hourlyRate * totalHours;

    // Create the order first (This stores the total price and payment status)
    const order = await Order.create({
      user: student, // Student making the booking
      tutor: tutor._id, // The tutor providing the service
      selectedMonths,
      selectedHours,
      totalPrice,
      totalRevenue: 0, // Initially set to 0, as the payment hasn't been processed yet
      status: "Pending", // Order is pending until payment is done
    });

    // Create the booking and associate it with the order
    const booking = await Booking.create({
      tutor: payload.tutor,
      student: tutor,
      status: "Pending",  // Pending until payment is confirmed
      selectedMonths,
      selectedHours,
      sessionDate,
      totalCost: totalPrice,  // Store the total cost of the booking
      order: order._id,  // Link the booking to the order
    });

    return booking;
}


  const getAllBookingsFromDb = async (filters: IBookingFilters) => {
    const query: any = {};

    if (filters.student) query.student = filters.student;
    if (filters.tutor) query.tutor = filters.tutor;
    if (filters.status) query.status = filters.status;

    if (filters.fromDate || filters.toDate) {
      query.sessionDate = {};
      if (filters.fromDate) query.sessionDate.$gte = new Date(filters.fromDate);
      if (filters.toDate) query.sessionDate.$lte = new Date(filters.toDate);
    }

    return Booking.find(query).populate('student').populate('tutor');
  }

//   const updateBookingStatusIntoDb = async (id: string, status: string) => {
//     const booking = await Booking.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true }
//     );
//     return booking;
//   }

const updateBookingStatusIntoDb= async (orderId: string) => {
    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    // Calculate total revenue for the tutor (could be the same as the total price or include fees)
    const totalRevenue = order.totalPrice;

    // Update the tutor's earnings (This could be added to a 'tutorEarnings' field in the tutor model)
    const tutor = await Tutor.findById(order.tutor); // Assuming order refers to a tutor
    if (tutor) {
      tutor.totalEarnings! += totalRevenue; // Increment tutor earnings by the total amount
      await tutor.save();
    }

    // Update the order to mark it as paid
    order.status = "Paid";
    await order.save();

    return order;
  }

  export const BookingService = {
    createBookingIntoDb,
    getAllBookingsFromDb,
    updateBookingStatusIntoDb
  }