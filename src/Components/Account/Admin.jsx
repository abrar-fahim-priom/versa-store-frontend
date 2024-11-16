import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useApiWithAuth } from "../../hooks/useApiWithAuth";
import {
  orderApi,
  useAcceptOrderMutation,
  useGetAllOrdersQuery,
  useRejectOrderMutation,
} from "../../store/api/orderApi";

export default function Admin() {
  const dispatch = useDispatch();
  const [activeFilter, setActiveFilter] = useState("all");
  useApiWithAuth();
  const { data: ordersData, isLoading, refetch } = useGetAllOrdersQuery();
  const [acceptOrder, { isLoading: isAccepting }] = useAcceptOrderMutation();
  const [rejectOrder, { isLoading: isRejecting }] = useRejectOrderMutation();

  useEffect(() => {
    return () => {
      dispatch(orderApi.util.invalidateTags(["AllOrders"]));
    };
  }, [dispatch]);

  const handleAcceptOrder = async (orderId) => {
    try {
      const result = await acceptOrder(orderId);
      if (result.data.success) {
        toast.success("Order accepted successfully");
        await refetch();
        dispatch(orderApi.util.invalidateTags(["AllOrders"]));
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to accept order");
    }
  };

  const handleRejectOrder = async (orderId) => {
    try {
      const result = await rejectOrder(orderId);
      if (result.data.success) {
        toast.success("Order rejected successfully");
        await refetch();
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject order");
    }
  };

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
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
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
    rejected:
      ordersData?.orders?.filter((order) => order.status === "rejected")
        .length || 0,
  };

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          All Active Orders
        </h2>

        <div className="flex gap-4 mb-6">
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
            filter="rejected"
            label="Rejected"
            count={orderCounts.rejected}
          />
        </div>

        {filteredOrders?.length > 0 ? (
          <div className="space-y-9 mx-9">
            {[...filteredOrders].reverse().map((order) => (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Order Details */}
                  <div className="lg:flex-1">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          Order #{order.tranxId}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
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
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize
                          ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : order.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {order.status}
                        </span>

                        {order.status === "pending" &&
                          !isAccepting &&
                          !isRejecting && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAcceptOrder(order._id)}
                                disabled={isAccepting}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onMouseEnter={() =>
                                  toast("Accept this order", {
                                    icon: "✅",
                                    duration: 1000,
                                    position: "top-center",
                                    style: {
                                      background: "#333",
                                      color: "#fff",
                                      fontSize: "14px",
                                      padding: "8px 12px",
                                    },
                                  })
                                }
                              >
                                {isAccepting ? "Accepting..." : "Accept"}
                              </button>

                              <button
                                onClick={() => handleRejectOrder(order._id)}
                                disabled={isRejecting}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onMouseEnter={() =>
                                  toast("Reject this order", {
                                    icon: "❌",
                                    duration: 1000,
                                    position: "top-center",
                                    style: {
                                      background: "#333",
                                      color: "#fff",
                                      fontSize: "14px",
                                      padding: "8px 12px",
                                    },
                                  })
                                }
                              >
                                {isRejecting ? "Rejecting..." : "Reject"}
                              </button>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4 mt-4">
                      {order.products.map((item) => (
                        <div
                          key={item?._id}
                          className="flex items-center gap-4"
                        >
                          <img
                            src={item?.product?.images?.[0]?.url}
                            alt={item?.product?.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">
                              {item?.product?.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Quantity: {item?.count}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="shrink-0">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          Shipping Details
                        </h3>
                        <div className="text-sm space-y-2">
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Name:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order?.orderName}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Phone:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order?.phoneNumber}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 text-gray-500 dark:text-gray-400">
                              Address:
                            </span>
                            <span className="text-gray-800 dark:text-white">
                              {order?.houseNo}, {order?.subDistrict},{" "}
                              {order?.district}, {order?.division},{" "}
                              {order?.postCode}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                        <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                          Order Summary
                        </h3>
                        <div className="flex justify-between text-sm mt-4">
                          <span className="text-gray-500 dark:text-gray-400">
                            Total:
                          </span>
                          <span className="font-semibold text-gray-800 dark:text-white">
                            ৳{order.totalPrice.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-lg">No orders found</p>
            <p className="text-sm mt-2">
              {activeFilter === "all"
                ? "All orders will appear here once any customer places order"
                : `No ${activeFilter} orders found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
