import { bookings as bookingsData } from "./assets/bookings.json";
import { makeSimpleSearch } from "./helpers";

export const bookings = {
  searchAll: makeSimpleSearch("/bookings", bookingsData, (booking, query) => {
    return booking.clinician.name.family
      .toLowerCase()
      .includes(query.toLowerCase());
  }),
  searchRecent: makeSimpleSearch(
    "/recent/bookings",
    bookingsData.slice(
      Math.floor(bookingsData.length / 2),
      Math.floor(bookingsData.length / 2) + 5
    ),
    (booking, query) => {
      return booking.clinician.name.family
        .toLowerCase()
        .includes(query.toLowerCase());
    }
  ),
};
