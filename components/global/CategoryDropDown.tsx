import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

const CategoryDropDown = ({ setOpenNav, openNav }: any) => {
  const handleClcik = () => {
    setOpenNav(false);
  };

  const pathName = usePathname();

  return (
    openNav && (
      <ul className="border rounded border-green-800 flex flex-col gap-3 lg:flex-row p-4 lg:justify-center lg:items-center z-[999999999999999999]">
        <li onClick={handleClcik} className="p-0">
          <Link
            className={`flex justify-between text-[20px]  font-semibold ${
              pathName == "/" ? "bg-black text-white" : "bg-neutral-100"
            }  p-2 rounded`}
            href="/"
          >
            <small>الرئيسية </small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>

        <li onClick={handleClcik} className="p-0">
          <Link
            className={`flex justify-between text-[20px] font-semibold ${
              pathName == "/products" ? "bg-black text-white" : "bg-neutral-100"
            } p-2 rounded`}
            href="/products"
          >
            <small> المنتجات </small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li onClick={handleClcik} className="p-0">
          <Link
            href="/care-article"
            className={`flex justify-between text-[20px] font-semibold ${
              pathName == "/care-article"
                ? "bg-black text-white"
                : "bg-neutral-100"
            } p-2 rounded`}
          >
            <small>المدونة</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li onClick={handleClcik} className="p-0">
          <Link
            href="/about"
            className={`flex justify-between text-[20px] font-semibold ${
              pathName == "/about" ? "bg-black text-white" : "bg-neutral-100"
            } p-2 rounded`}
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
