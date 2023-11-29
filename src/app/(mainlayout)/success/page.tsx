"use client";

import { useAppSelector } from "@/redux/reduxHooks";
import moment from "moment";
import Link from "next/link";

const SuccessPage = () => {
  const { amount, created, last4, transaction } = useAppSelector(
    (state) => state.payment
  );

  return (
    <div className="flex justify-center align-middle items-center min-h-screen px-8">
      <div className="p-5 sm:p-12 mt-32 mb-16 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Your Payment Processed Successfully
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white pb-4">
              Here is your last transaction info
            </p>
            <div className="text-left">
              <p className="text-gray-700 dark:text-gray-400">Amount: ${amount}</p>
              <p className="text-gray-700 dark:text-gray-400">
                Transaction ID: {transaction}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Last 4 Digit of Card: {last4}
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                Time: {moment(created).format("llll")}
              </p>
            </div>
            <Link href={"/"}>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
