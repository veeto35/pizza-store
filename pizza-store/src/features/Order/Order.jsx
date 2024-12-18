// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from '../../features/Order/OrderItem'
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();
  
  useEffect(
    function() {
      if(!fetcher.data && fetcher.state === 'idle')
      fetcher.load("/menu");
    },[fetcher]
  );

  console.log(fetcher.data)
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h2 className="text-xl font-semibold">Order Nr.{id} Status</h2>

        <div className="space-x-2">
          {priority && <span className="py-1 text-sm uppercase font-semibold rounded-full bg-red-500 text-red-50 tracking-wide px-3">Priority</span>}
          <span className="px-3 py-1 text-sm uppercase font-semibold rounded-full bg-green-500 text-green-50 tracking-wide">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 py-5 px-6">
        <p className="font-medium text-stone-500">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>


      <ul className="divider-y divider-stone-200 border-b border-t ">
        {cart.map(item => <OrderItem key={item.pizzaId} item={item} ingredients={fetcher?.data?.find(el => el.id === item.pizzaId).ingredients ?? []} isLoadingIngredients={fetcher.state === 'loading'}/>)}
      </ul>



      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
