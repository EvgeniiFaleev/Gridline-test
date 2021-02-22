const fs = require("fs");
let flights = require("./flights.json");

let arr = flights.result.flights;
arr = arr.map((item) => {
  item.flight.price.total.amount = +item.flight.price.total.amount;
  return item;
});

const newFlights = JSON.stringify({ ...flights });

fs.writeFileSync("newFlights.json", newFlights);
