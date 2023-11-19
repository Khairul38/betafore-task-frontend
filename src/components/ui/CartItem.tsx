import { decrement, increment, remove } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/reduxHooks";
import { IProduct } from "@/types/globalTypes";
import Image from "next/image";
import React from "react";

const CartItem = ({ product }: { product: IProduct }) => {
  const { _id, title, image, price, totalQuantity, orderQuantity } = product;
  const dispatch = useAppDispatch();

  const handleIncrement = (
    _id: number,
    title: string,
    image: string,
    price: number,
    totalQuantity: number
  ) => {
    if (totalQuantity > 0) {
      dispatch(increment({ _id, title, image, price, totalQuantity }));
    }
  };

  const handleDecrement = (
    _id: number,
    title: string,
    image: string,
    price: number,
    orderQuantity: number
  ) => {
    if (orderQuantity > 1) {
      dispatch(decrement({ _id, title, image, price }));
    } else {
      dispatch(remove({ _id, price, orderQuantity }));
    }
  };

  const handleRemove = (_id: number, price: number, orderQuantity: number) => {
    dispatch(remove({ _id, price, orderQuantity }));
  };
  return (
    <>
      <li className="sm:flex items-center p-4 bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800">
        <Image
          className="block mb-4 sm:mb-0 mr-5 md:w-32 xl:w-auto shrink-0"
          src={image}
          alt={title}
          priority={true}
          quality={100}
          width="200"
          height="200"
        />
        <div className="grow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {title}
          </h3>
          {/* Product meta */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="space-x-3">
              <div className="inline-flex text-sm font-medium bg-blue-100 text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-lg text-center px-2 py-0.5">
                ${price}
              </div>
              <div
                className={`inline-flex text-sm font-medium bg-blue-100 text-blue-600 dark:bg-gray-600 dark:text-gray-300 rounded-lg text-center px-2 py-0.5`}
              >
                {totalQuantity === 0
                  ? "Out of Stock"
                  : `${totalQuantity} In Stock`}
              </div>
            </div>

            <div className="flex flex-row space-x-2 items-center">
              <button
                onClick={() =>
                  handleDecrement(
                    _id,
                    title,
                    image,
                    price,
                    orderQuantity as number
                  )
                }
                className="focus:outline-none bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M18 12H6"
                  />
                </svg>
              </button>
              <p className="text-gray-700 dark:text-gray-400">
                {orderQuantity}
              </p>
              <button
                onClick={() =>
                  handleIncrement(_id, title, image, price, totalQuantity)
                }
                className="focus:outline-none bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-1 px-1 rounded-full inline-flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  handleRemove(_id, price, orderQuantity as number)
                }
                className="focus:outline-none text-xs bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 text-white font-bold py-1 px-1.5  rounded-full inline-flex items-center"
              >
                <svg
                  className="w-3 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default CartItem;
