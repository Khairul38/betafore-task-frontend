import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/lib/Providers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "BETAFORE",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head>
          {/* <link
            href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.css"
            rel="stylesheet"
          /> */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  localStorage.setItem('color-theme', 'dark')
                } else {
                  document.documentElement.classList.remove('dark')
                  localStorage.setItem('color-theme', 'light')
                }
              `,
            }}
          />
        </head>
        <body className="bg-white dark:bg-gray-900">
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.min.js"
            async
          />
        </body>
      </html>
    </Providers>
  );
}
