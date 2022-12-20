import { gql } from "apollo-server-express";

const Schema = gql`
  scalar Date
  type Order {
    order_id: ID!
    order_placed: String
    product_name: String
    price: Float
    first_name: String
    last_name: String
    address: String
    email: String
    order_status: String
  }

  type TotalRevenueByMonthType {
    month: String!
    year: String!
    revenue: Float!
  }

  type Query {
    totalOrders: Int!
    totalOrdersByMonth(selectedDate: Date!): Int!
    ordersInProgress: Int!
    totalRevenue: Int!
    totalRevenueByMonthAndYear: [TotalRevenueByMonthType]!
    recentOrders(numOrders: Int!): [Order]!
  }
`;

export default Schema;
