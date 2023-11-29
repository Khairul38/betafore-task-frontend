"use client";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "../common/Loader";
import { useEffect } from "react";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    login({ email: data.email, password: data.password });
  };

  useEffect(() => {
    // if (isLoggedIn) {
    //   navigate(from, { replace: true });
    // }
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (data?.data?.accessToken) {
      notify("success", "User login successfully");
      router.push("/");
      // navigate(from, { replace: true });
    }
  }, [data, error]);

  return (
    <div className="flex justify-center align-middle items-center px-8 min-h-screen">
      <div className="p-5 sm:p-12 my-16 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
        <div>
          <div className="flex flex-col space-y-2 text-center mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Login to your account
            </h1>
            <p className="text-sm text-muted-foreground text-gray-900 dark:text-white">
              Enter your email & password below
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@betafore.com"
                required
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-600">{errors.password.message}</p>
              )}
            </div>
            <div className="flex items-start mb-5">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                New user?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  href={"/register"}
                >
                  Create an account
                </Link>
              </p>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoading ? (
                <Loader className="my-0" color="text-white" />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
