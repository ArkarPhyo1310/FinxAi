import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen text-gray-400">
      <Header />
      <div className="container py-10 mb-20">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
