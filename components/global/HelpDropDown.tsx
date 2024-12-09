import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

const HelpDropDown = ({ openHelp }: any) => {
  return (
    openHelp && (
      <ul className="flex flex-col lg:flex-row lg:justify-center lg:items-center  lg:h-[3.5rem]">
        <li>
          <Link href="#" className="py-2 flex justify-between text-[20px]">
            <small>الشحن والإسترجاع</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li>
          <Link href="#" className="py-2 flex justify-between text-[20px]">
            <small>جدول المقاسات</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
        <li>
          <Link href="#" className="py-2 flex justify-between text-[20px]">
            <small> طرق الدفع</small>
            <IoIosArrowBack className="lg:hidden" />
          </Link>
        </li>
      </ul>
    )
  );
};

export default HelpDropDown;
