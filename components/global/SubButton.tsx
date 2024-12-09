import Link from "next/link";

const SubButton = () => {
  return (
    <div className="top-offer-nav flex justify-center tracking-wide items-center gap-1 h-[1.9rem] bg-[#003322] font-semibold text-white text-[12px]">
      <Link href="/" className="decoration-white underline">
        إشترك
      </Link>
      <p>الأن للحصول علي خصم 20%</p>
    </div>
  );
};

export default SubButton;
