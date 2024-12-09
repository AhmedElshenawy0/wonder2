import FooterLinks from "./FooterLinks";
import MainFooter from "./MainFooter";

const Footer = () => {
  return (
    <div className="bg-[#003322] lg:px-[4.5rem] py-[2rem] z-[9] relative">
      <MainFooter />
      <p className="text-center text-[12px] mt-5  text-[#737373]">
        © جميع الحقوق محفوظة شركه وندر للتجارة
      </p>
    </div>
  );
};

export default Footer;
