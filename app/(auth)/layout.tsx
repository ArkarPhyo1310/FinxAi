"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href="/" className="auth-logo mb-8 lg:mb-0">
          <Image
            src="/assets/logo/logo.png"
            alt="FinxAI logo"
            width={140}
            height={32}
            className="w-auto"
          />
        </Link>
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>

      <section className="auth-right-section scrollbar-hide-default relative">
        <div className="z-10 relative lg:mt-4 lg:mb-16">
          <blockquote className="auth-blockquote">
            &ldquo;Empowering your financial journey with intelligent insights
            and a clear vision for the future. Discover the tools to navigate
            the markets with confidence.&rdquo;
            <footer className="mt-5 auth-testimonial-author">
              &mdash; FinXAI
            </footer>
            <div className="flex-1 relative lg:p-16 mt-8 lg:mt-12">
              <Image
                src="/assets/images/dashboard-preview.png"
                alt="dashboard-preview"
                width={2616}
                height={1356}
                className="auth-dashboard-preview absolute top-0 w-full max-w-md mx-auto"
              />
            </div>
          </blockquote>
        </div>
      </section>
    </main>
  );
};

export default Layout;
