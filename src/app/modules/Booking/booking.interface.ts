export interface IBooking {
  tutorId: string;
  studentId: string;
  subject: string;
  date: string;
  day: string;
  timeSlot: {
    startTime: string;
    endTime: string;
  };
  status?: 'confirmed' | 'pending' | 'cancelled' | 'accepted' | 'rejected'|'Paid'|"Failed";
}
