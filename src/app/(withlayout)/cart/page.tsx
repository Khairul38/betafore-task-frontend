"use client";
import CartItem from "@/components/ui/CartItem";
import { useAppSelector } from "@/redux/reduxHooks";
import Link from "next/link";
import React from "react";

const CartPage = () => {
  const { cartProducts, totalItem, totalPrice } = useAppSelector(
    (state) => state.cart
  );

  if (cartProducts.length === 0)
    return (
      <div className="flex justify-center align-middle items-center h-[80vh] px-8">
        <p className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold text-center">
          There is no product in Shopping Cart. Please add some product
        </p>
      </div>
    );
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 pt-24 w-full">
        {/* Page content */}
        <div className="max-w-screen-2xl mx-auto flex flex-col justify-between lg:flex-row lg:space-x-8 xl:space-x-16">
          {/* Cart items */}
          <div className="mb-6 lg:mb-0 w-full ">
            <header className="mb-4">
              {/* Title */}
              <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold">
                Shopping Cart ({cartProducts.length}) ✨
              </h1>
            </header>

            {/* Cart items */}
            <ul className="space-y-5">
              {cartProducts.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </ul>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-36 h-[47vh] lg:h-[calc(100vh-280px)] lg:overflow-x-hidden lg:overflow-y-auto scrollbar-none lg:min-w-fit">
            <div className="bg-white border border-gray-200 rounded-lg shadow dark:border-gray-700 dark:bg-gray-800 p-5 lg:w-72 xl:w-80">
              <div className="font-semibold mb-2 text-gray-900 dark:text-white">
                Order Summary
              </div>
              {/* Order details */}
              <ul className="mb-4">
                <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200 text-gray-700 dark:text-gray-400">
                  <div>Total Items</div>
                  <div className="font-medium ">{totalItem}</div>
                </li>
                <li className="text-sm w-full flex justify-between py-3 border-b border-slate-200 text-gray-700 dark:text-gray-400">
                  <div>Total Price</div>
                  <div className="font-medium ">${totalPrice}</div>
                </li>
              </ul>
              <div>
                <Link href={"/checkout"}>
                  <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Checkout - ${totalPrice}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
