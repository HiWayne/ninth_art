import useStore from "@/store";
import { Customer } from "./characters/Customer";

export const Customers = () => {
  const customers = useStore((state) => state.restaurant.game.getCustomers());
  return (
    <>
      {customers.map((customer) => (
        <Customer data={customer} key={customer.id} />
      ))}
    </>
  );
};
