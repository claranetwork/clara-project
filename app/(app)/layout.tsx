import { Fragment } from "react";
import Footer from "@/components/layouts/footer";
import Navbar from "@/components/layouts/navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Navbar /> */}
      {children}
      <Footer />
    </>
  );
};
export default Layout;
