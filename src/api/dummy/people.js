import { makeSimpleSearch } from "./helpers";
import { people as examplePeople } from "./assets/people.json";

const isLike = (person, query) =>
  person.name.family.toLowerCase().includes(query.toLowerCase());

export const people = {
  searchAll: makeSimpleSearch("/people", examplePeople, isLike, 10),
  searchRecent: makeSimpleSearch(
    "/recent/people",
    examplePeople.slice(20, 30),
    isLike,
    10
  ),
};
