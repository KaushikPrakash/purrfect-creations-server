export type TotalRevenueByMonthAndYearType = {
  month: string;
  year: string;
  revenue: number;
};

export type Order = {
  order_id: string;
  order_placed: string;
  product_name: string;
  price: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  order_status: string;
};
