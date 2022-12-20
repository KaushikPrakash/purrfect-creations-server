import { FieldSet, Records } from "airtable";
import moment from "moment";

export const getTotalRevenuePerMonthAndYear = (records: Records<FieldSet>) =>
  Object.entries(
    records.reduce(
      (totalPrices: { [order_placed: string]: number }, record) => {
        // Format the month using the moment library
        const month = moment(String(record.get("order_placed"))).format("MMMM");
        const year = moment(String(record.get("order_placed"))).format("YYYY");
        const key = `${month}-${year}`;
        const price = Number(record.get("price"));
        if (!totalPrices[key]) {
          totalPrices[key] = 0;
        }
        totalPrices[key] += price;
        return totalPrices;
      },
      {}
    )
  )
    .map(([key, revenue]) => {
      // Split the key into month and year
      const [month, year] = key.split("-");
      return { month, year, revenue };
    })
    .sort((a, b) =>
      moment(`${a.month}-${a.year}`, "MMMM-YYYY").diff(
        moment(`${b.month}-${b.year}`, "MMMM-YYYY")
      )
    );
