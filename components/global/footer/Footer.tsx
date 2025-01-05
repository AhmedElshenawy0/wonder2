import MainFooter from "./MainFooter";

const Footer = () => {
  return (
    <div className="bg-[#000000] lg:px-[4.5rem] py-[2rem] z-[9] relative">
      <MainFooter />
      <p className="text-center text-[12px] mt-10  text-[#737373]">
        © جميع الحقوق محفوظة لشركه RAVELLE
      </p>
    </div>
  );
};

export default Footer;
