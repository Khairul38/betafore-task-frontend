import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="w-full max-w-screen-2xl mx-auto p-8 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link href="/home" className="flex items-center mb-4 sm:mb-0">
            <Image
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              width={32}
              height={32}
              alt="Betafore Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              BETAFORE
            </span>
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline">
                Refund and Return Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact us
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <Link href="/" className="hover:underline">
            BETAFORE™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
