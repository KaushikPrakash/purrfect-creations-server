import Airtable from "airtable";
import { config } from "dotenv";
config();

import { TotalRevenueByMonthAndYearType } from "./types";

import { getTotalRevenuePerMonthAndYear } from "./utils";
import { DateScalar } from "graphql-date-scalars";

const AIRTABLE_API_KEY: string = process.env.AIRTABLE_API_KEY as string;

const AIRTABLE_BASE_ID: string = process.env.AIRTABLE_BASE_ID as string;

const TABLE_NAME = "Orders";
const airtable = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);

const Resolvers = {
  Date: DateScalar,
  Query: {
    totalOrders: async (): Promise<any> => {
      const records = await airtable(TABLE_NAME).select().all();
      return records.length;
    },
    totalOrdersByMonth: async (
      _: any,
      { selectedDate }: any
    ): Promise<number> => {
      const d = new Date(selectedDate);
      const selectedMonth = d.getMonth();
      const selectedYear = d.getFullYear();
      const formula = `DATETIME_PARSE(order_placed, 'YYYY-MM') = DATETIME_PARSE('${selectedMonth}-${selectedYear}-01', 'YYYY-MM-DD')`;
      const records = await airtable(TABLE_NAME)
        .select({
          filterByFormula: formula,
        })
        .all();
      return records.length;
    },
    ordersInProgress: async (): Promise<number> => {
      const records = await airtable(TABLE_NAME)
        .select({
          filterByFormula: "{order_status} = 'in_progress'",
        })
        .all();
      return records.length;
    },
    totalRevenue: async (): Promise<number> => {
      let totalRevenue = 0;
      const records = await airtable(TABLE_NAME)
        .select({
          filterByFormula: "{order_status} = 'in_progress'",
        })
        .all();
      records.forEach((record) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        totalRevenue += parseInt(record.get("price"));
      });
      return totalRevenue;
    },
    totalRevenueByMonthAndYear: async (): Promise<
      TotalRevenueByMonthAndYearType[]
    > => {
      const records = await airtable(TABLE_NAME)
        .select({
          sort: [{ field: "order_placed", direction: "asc" }],
          filterByFormula: "{order_status} = 'in_progress'",
        })
        .all();
      const monthlyRevenue = getTotalRevenuePerMonthAndYear(records);
      return monthlyRevenue;
    },

    recentOrders: async (_: any, { numOrders }: any): Promise<any[]> => {
      const records = await airtable(TABLE_NAME)
        .select({
          sort: [{ field: "order_placed", direction: "desc" }],
          maxRecords: numOrders,
        })
        .all();

      return records.map((record) => ({
        order_id: record.get("order_id"),
        order_placed: record.get("order_placed"),
        product_name: record.get("product_name"),
        price: record.get("price"),
        first_name: record.get("first_name"),
        last_name: record.get("last_name"),
        quantity: record.get("Quantity"),
        address: record.get("address"),
        email: record.get("email"),
        order_status: record.get("order_status"),
      }));
    },
  },
};
export default Resolvers;
