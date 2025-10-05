import Navbar from "@/components/ui/navbar";
const LayoutKedua = ({ children }) => {
  return (
    <main className="">
      <Navbar />
      {children}
    </main>
  );
};

export default LayoutKedua;
