// import useGlobalContext from "@/hooks/useGlobalContext";
// import GetCamelCase from "@/utils/GetCamelCase";
"use client";
import { increment } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { IProduct } from "@/types/globalTypes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { notify } from "../common/Toastify";

const ProductCard = ({ product }: { product: IProduct }) => {
  const router = useRouter();
  const { _id, title, image, price } = product;
  const dispatch = useAppDispatch();
  const [totalQuantity, setTotalQuantity] = useState(product.totalQuantity);
  const [productInCart, setProductInCart] = useState<boolean>(false);

  const { cartProducts } = useAppSelector((state) => state.cart);

  useEffect(() => {
    const currentProduct = cartProducts.find((product) => product._id === _id);
    if (currentProduct) {
      setProductInCart(true);
      setTotalQuantity(currentProduct.totalQuantity);
    } else {
      setTotalQuantity(product.totalQuantity);
    }
  }, [_id, product.totalQuantity, cartProducts]);

  const handleIncrement = (
    _id: number,
    title: string,
    image: string,
    price: number,
    totalQuantity: number
  ) => {
    if (totalQuantity > 0) {
      dispatch(increment({ _id, title, image, price, totalQuantity }));
      notify("success", "Add to cart successful");
    }
  };

  return (
    <div className="mx-auto">
      <div className="max-w-sm bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 hover:shadow-blue-200 dark:shadow-blue-500 dark:hover:shadow-blue-500 hover:shadow-2xl transition-all overflow-hidden">
        <div className="relative">
          <Image
            className="rounded-t-lg w-full p-4"
            src={image}
            alt={title}
            priority={true}
            quality={100}
            width="200"
            height="200"
          />
          <div className="absolute top-0 right-0">
            <div
              className={`text-xs font-medium text-slate-100  ${
                totalQuantity === 0 ? "bg-red-600" : "bg-blue-600"
              } bg-opacity-90 rounded-bl-xl text-center px-2 py-1`}
            >
              {totalQuantity === 0
                ? "Out of Stock"
                : `${totalQuantity} In Stock`}
            </div>
          </div>
          <div className="absolute bottom-0 left-0">
            <div
              className={`text-xs font-medium text-slate-100 bg-blue-600 bg-opacity-90 rounded-tr-xl text-center px-2 py-1`}
            >
              <span className="">${price}</span>
            </div>
          </div>
        </div>

        <div className="p-5 space-y-5">
          <h5 className="mb-3 text-md font-bold text-gray-900 dark:text-gray-400 line-clamp-2">
            {title}
          </h5>

          <button
            onClick={() => {
              if (productInCart) {
                router.push("/cart");
              } else if (cartProducts.length === 2) {
                notify("error", "You can add only 2 product");
              } else {
                handleIncrement(_id, title, image, price, totalQuantity);
              }
            }}
            type="button"
            className="w-full py-2.5 px-5 mb- text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            {productInCart ? "Go To Cart" : "Add To Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
