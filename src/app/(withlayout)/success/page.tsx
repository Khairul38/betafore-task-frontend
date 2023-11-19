"use client";

import { useAppSelector } from "@/redux/reduxHooks";
import moment from "moment";

const SuccessPage = () => {
  const { amount, created, last4, transaction } = useAppSelector(
    (state) => state.payment
  );

  return (
    <div className="flex justify-center align-middle items-center h-[90vh] px-8">
      <div className="p-5 sm:p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Your Payment Processed Successfully
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white pb-4">
              Here is your last transaction info
            </p>
            <p className="text-gray-900 dark:text-white">Amount: ${amount}</p>
            <p className="text-gray-900 dark:text-white">
              Transaction ID: {transaction}
            </p>
            <p className="text-gray-900 dark:text-white">
              Last 4 Digit of Card: {last4}
            </p>
            <p className="text-gray-900 dark:text-white">
              Time: {moment(created).format('llll')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
