import { gql } from "apollo-server-express"; //will create a schema

const Schema = gql`
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

  type Query {
    totalOrders: Int!
    totalOrdersByMonth(date: String!): Int
    ordersInProgress: Int!
    totalRevenue: Int!
    recentOrders(numOrders: Int!): [Order]!
  }
`;

export default Schema;
