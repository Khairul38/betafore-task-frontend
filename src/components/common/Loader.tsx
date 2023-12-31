const Loader = ({
  className,
  w,
  h,
  color,
}: {
  className?: string;
  w?: string;
  h?: string;
  color?: string;
}) => {
  return (
    <div
      className={`flex justify-center items-center ${
        className ? className : "my-4"
      }`}
    >
      <svg
        className={`animate-spin ${w && h ? `w-${w} h-${h}` : "w-5 h-5"} ${
          color ? color : "text-blue-600"
        } fill-current shrink-0`}
        viewBox="0 0 16 16"
      >
        <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
      </svg>
    </div>
  );
};

export default Loader;
