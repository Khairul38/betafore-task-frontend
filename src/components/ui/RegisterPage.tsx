"use client";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Loader from "../common/Loader";
import { useEffect } from "react";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";

interface SignupFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const router = useRouter();
  const [signup, { data, isLoading, error }] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const onSubmit = (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      notify("error", "Password do not match");
    } else {
      signup({
        name: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
      });
    }
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
      router.push("/home");
      // navigate(from, { replace: true });
    }
  }, [data, error]);

  return (
    <div className="flex justify-center align-middle items-center h-[100vh] px-8">
      <div className="p-5 sm:p-12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-9/12 lg:w-6/12 xl:w-4/12">
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
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your first name
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("firstName", {
                  required: "First Name is required",
                })}
              />
              {errors.firstName && (
                <p className="text-red-600">{errors.firstName.message}</p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your last name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("lastName", {
                  required: "Last Name is required",
                })}
              />
              {errors.lastName && (
                <p className="text-red-600">{errors.lastName.message}</p>
              )}
            </div>
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
            <div className="mb-5">
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your confirm password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
            <div className="flex items-start mb-5">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Already have an account?{" "}
                <Link
                  className="text-blue-500 hover:text-blue-600"
                  href={"/login"}
                >
                  Login
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
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
