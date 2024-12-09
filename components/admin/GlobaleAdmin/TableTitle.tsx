import "./globaleAdmin.css";
const TableTitle = ({ children }: { children: string }) => {
  return (
    <div className="relative flex flex-col items-center">
      <h2
        dir="rtl"
        className="absolute  uppercase z-20 text-white right-[50%] translate-x-[50%] font-semibold lg:text-[18px] -top-8 w-[90%] mx-auto px-3 py-5 bg-gradient-to-bl from-[#000000] to-[#3d3d3d] rounded-2xl"
      >
        {children}
      </h2>
      <div
        style={{
          transform: "rotateX(75deg)",
          filter: "blur(20px)",
          backgroundColor: "rgb(100,100,100)",
        }}
        className="absolute w-[90%] top-[24px] z-10 h-10 rounded-[500px/50px]"
      ></div>
    </div>
  );
};

export default TableTitle;
