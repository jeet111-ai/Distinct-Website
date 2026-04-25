import { insertBookingSchema } from '../shared/schema';
console.log("Validating...");
const payload = {
      firstName: "John",
      lastName: "Doe",
      email: "a@a.com",
      phone: "1234567890",
      company: "Company",
      location: "General Inquiry",
      message: "",
      numberOfSeats: "1",
      timeline: "Immediate",
    };
const res = insertBookingSchema.safeParse(payload);
console.log(JSON.stringify(res, null, 2));
