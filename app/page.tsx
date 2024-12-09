import Banner from "@/components/home/Banner/Banner";
import BestSeller from "@/components/home/bestSection/BestSeller";
import Services from "@/components/home/services/Services";
import Reviews from "@/components/home/Reviews/Reviews";
import Features from "@/components/home/Features/Features";
import Sale from "@/components/home/Sale/Sale";
import Model from "@/components/home/Model/Model";
import Category from "@/components/home/Category/Category";
import ReadMore from "@/components/home/Read-more/ReadMore";
import CartPopup from "@/components/cart/CartPopup";

export default function Home() {
  return (
    <div className="mt-[86px] lg:mt-[86px]">
      <CartPopup />
      <Banner />
      <Sale />
      <Model />
      <Category />
      {/* <Collections /> */}
      <BestSeller />
      <Reviews />
      <ReadMore />
      <Features />
      <Services />
    </div>
  );
}
