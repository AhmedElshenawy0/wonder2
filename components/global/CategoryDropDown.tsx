import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const CategoryDropDown = ({ setOpenNav, openNav }: any) => {
  const handleClcik = () => {
    setOpenNav(false);
  };

  return (
    openNav && (
      <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center z-[999999999999999999]  lg:h-[3.5rem]">
        <li onClick={handleClcik}>
          <Link className="flex justify-between text-[20px]" href="/">
            <small> اkhjkلرئيسية </small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>

        <li onClick={handleClcik}>
          <Link className="flex justify-between text-[20px]" href="/products">
            <small> المنتجات </small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li onClick={handleClcik}>
          <Link
            href="/care-article"
            className="py-2 flex justify-between text-[20px]"
          >
            <small>المدونة</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li onClick={handleClcik}>
          <Link
            href="/about"
            className="py-2 flex justify-between  text-[20px]"
          >
            <small>من نحن</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
      </ul>
    )
  );
};

export default CategoryDropDown;
