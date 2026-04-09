import Footer from "../components/common/Footer";
import Navbar from "../layout/Navbar";

export default function OuterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
