import Airtable from "airtable";

// Replace with your Airtable API key
const AIRTABLE_API_KEY = "key7TCn5BPQiu9jKy";

// Replace with the base ID of your Airtable database
const AIRTABLE_BASE_ID = "app8wLQrrIMrnn673";

const TABLE_NAME = "Orders";

// Create a new Airtable instance
const airtable = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(
  AIRTABLE_BASE_ID
);

const Resolvers = {
  Query: {
    totalOrders: async (): Promise<any> => {
      // Fetch all records from the Orders table
      try {
        const records = await airtable(TABLE_NAME).select().all();

        // Return the total number of records
        return records.length;
      } catch (err) {
        console.error(err);
        return 0;
      }
    },
    totalOrdersByMonth: async (_: any, { month, year }: any): Promise<any> => {
      // Fetch all records from the Orders table
      try {
        const records = await airtable(TABLE_NAME)
          .select({
            filterByFormula: `AND(
            MONTH({Date}) = ${month},
            YEAR({Date}) = ${year}
          )`,
          })
          .all();

        // Return the total number of records
        return records.length;
      } catch (err) {
        console.error(err);
        return 0;
      }
    },
    ordersInProgress: async (): Promise<any> => {
      // Fetch all records from the Orders table
      try {
        const records = await airtable(TABLE_NAME)
          .select({
            filterByFormula: "{order_status} = 'in_progress'",
          })
          .all();

        // Return the total number of records
        return records.length;
      } catch (err) {
        console.error(err);
        return 0;
      }
    },
    totalRevenue: async (): Promise<number> => {
      try {
        // Query Airtable for revenue in progress
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
      } catch (error) {
        // Log the error and return 0 if there is an issue fetching the revenue
        console.error(error);
        return 0;
      }
    },

    recentOrders: async (_: any, { numOrders }: any): Promise<any[]> => {
      try {
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
      } catch (err) {
        console.error(err);
        return [];
      }
    },
  },
};
export default Resolvers;
