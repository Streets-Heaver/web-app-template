import { bookings } from "./bookings";
import { people } from "./people";

export const injectDummyEndpoints = (apiMocker) => {
  people.searchAll(apiMocker);
  people.searchRecent(apiMocker);
  bookings.searchAll(apiMocker);
  bookings.searchRecent(apiMocker);
};
