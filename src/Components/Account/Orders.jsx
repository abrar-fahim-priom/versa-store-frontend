import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import { orderApi, useGetUserOrdersQuery } from "../../store/api/orderApi";
import LoaderGradient from "../ui/LoaderGradient";

export default function Orders() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("all");
  useApiWithAuth();
  const { data: ordersData, isLoading } = useGetUserOrdersQuery();

  useEffect(() => {
    return () => {
      dispatch(orderApi.util.invalidateTags(["Orders"]));
    };
  }, [dispatch]);

  const filterOrders = (orders) => {
    if (!orders) return [];
    if (activeFilter === "all") return orders;
    return orders.filter((order) => order.status === activeFilter);
  };

  const FilterButton = ({ filter, label, count }) => (
    <button
      onClick={() => setActiveFilter(filter)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
        ${
          activeFilter === filter
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
        }`}
    >
      {label} ({count})
    </button>
  );

  if (isLoading) {
    return <LoaderGradient />;
  }

  const filteredOrders = filterOrders(ordersData?.orders);
  const orderCounts = {
    all: ordersData?.orders?.length || 0,
    pending:
      ordersData?.orders?.filter((order) => order.status === "pending")
        .length || 0,
    accepted:
      ordersData?.orders?.filter((order) => order.status === "accepted")
        .length || 0,
    cancelled:
      ordersData?.orders?.filter((order) => order.status === "cancelled")
        .length || 0,
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="bg-neutral-100 dark:bg-black h-full min-h-screen rounded-xl shadow-lg p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          My Orders
        </h2>

        <div className="flex dark:text-white flex-wrap gap-4 mb-6">
          <FilterButton
            filter="all"
            label="All Orders"
            count={orderCounts.all}
          />
          <FilterButton
            filter="pending"
            label="Pending"
            count={orderCounts.pending}
          />
          <FilterButton
            filter="accepted"
            label="Accepted"
            count={orderCounts.accepted}
          />
          <FilterButton
            filter="cancelled"
            label="Cancelled"
            count={orderCounts.cancelled}
          />
        </div>

        {filteredOrders?.length > 0 ? (
          <div className="space-y-6">
            {[...filteredOrders].reverse().map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray rounded-lg shadow p-4 md:p-6"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  {/* Order Details */}
                  <div className="lg:flex-1">
                    <div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-between pb-4 border-b border-slate-200">
                      <div>
                        <p className="font-medium text-sm md:text-base md:font-medium text-gray-800 dark:text-white">
                          Order #{order.tranxId}
                        </p>
                        <p className="text-sm text-gray dark:text-gray">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
    ${
      order.status === "pending"
        ? "bg-yellow-100 text-yellow-800"
        : order.status === "accepted"
        ? "bg-green-100 text-green-800"
        : order.status === "cancelled"
        ? "bg-red-100 text-red-800"
        : order.status === "rejected"
        ? "bg-red-300 text-gray-800"
        : "bg-red-300 text-gray-800"
    }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4 mt-4">
                      {order.products.map((item) => (
                        <div
                          key={item._id}
                          className="flex dark:text-white items-center gap-4"
                        >
                          <img
                            src={item.product.images?.[0]?.url}
                            alt={item.product.name}
                            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {item.product.name}
                            </p>
                            <p className="text-sm text-gray dark:text-white">
                              Quantity: {item.count}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="shrink-0">
                    <div className="bg-white dark:bg-gray rounded-xl p-4 md:p-6 space-y-4 md:space-y-6">
                      <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                        Shipping Details
                      </h3>
                      <div className="text-sm space-y-2">
                        <div className="flex">
                          <span className="w-16 md:w-20 text-gray dark:text-white">
                            Name:
                          </span>
                          <span className="text-gray-800 dark:text-white">
                            {order.orderName}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-16 md:w-20 text-gray dark:text-white">
                            Phone:
                          </span>
                          <span className="text-gray-800 dark:text-white">
                            {order.phoneNumber}
                          </span>
                        </div>
                        <div className="flex">
                          <span className="w-16 md:w-20 text-gray dark:text-white">
                            Address:
                          </span>
                          <span className="text-gray-800 dark:text-white">
                            {order.houseNo}, {order.subDistrict},{" "}
                            {order.district}, {order.division}, {order.postCode}
                          </span>
                        </div>
                      </div>

                      <div className="border-t border-slate-200  dark:border-gray-600 pt-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          Order Summary
                        </h3>
                        <div className="flex justify-between text-sm mt-4">
                          <span className="text-gray text-lg dark:text-gray-300">
                            Total:
                          </span>
                          <span className="font-semibold text-xl text-green-600 text-gray-800 ">
                            ৳{order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                        {order.status === "pending" && (
                          <a href={order.paymentUrl}>
                            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                              PAY NOW
                            </button>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray py-8 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg">
              {activeFilter === "all"
                ? "No orders yet"
                : `No ${activeFilter} orders found`}
            </p>
            <p className="text-sm mt-2">
              {activeFilter === "all"
                ? "Your orders will appear here once you make a purchase"
                : `You don't have any orders with ${activeFilter} status`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
