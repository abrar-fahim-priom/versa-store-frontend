import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
  FaTimesCircle,
} from "react-icons/fa";

const AlertNotification = ({
  show,
  message,
  type = "info", // 'success', 'error', 'info', 'warning'
  onClose,
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500",
          icon: <FaCheckCircle className="h-5 w-5" />,
        };
      case "error":
        return {
          bg: "bg-red-500",
          icon: <FaTimesCircle className="h-5 w-5" />,
        };
      case "warning":
        return {
          bg: "bg-yellow-500",
          icon: <FaExclamationCircle className="h-5 w-5" />,
        };
      default:
        return {
          bg: "bg-blue-500",
          icon: <FaInfoCircle className="h-5 w-5" />,
        };
    }
  };

  const { bg, icon } = getAlertStyles();

  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`${bg} text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2`}
        >
          {icon}
          <span className="text-sm font-medium">{message}</span>
        </div>
      </div>
    </Transition>
  );
};

export default AlertNotification;
