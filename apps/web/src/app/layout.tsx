
import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from './_components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';
import { cn } from "@/lib/utils";
import FirstNav from './firstnav/page';
import { Toaster } from "@/components/ui/sonner"
// import { SessionProvider } from "next-auth/react";
// import MyProvider from "./_components/MyProvider/MyProvider";
// import WishlistContextProvider from "@/context/WishlistContext"
import Providers from "./_components/Providers"
// import CartContextProvider from "../context/CartContext"
const jetbrainsMono = JetBrains_Mono({subsets:['latin'],variable:'--font-mono'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TalSuzo Bazaar",
  description: "TalSuzo Bazaar ecommerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-mono", jetbrainsMono.variable)}>
      {/* <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MyProvider>
          <CartContextProvider><WishlistContextProvider>
          <FirstNav/>
        <Navbar/>
        {children}
                <Toaster />

        <Footer/></WishlistContextProvider>
        </CartContextProvider>
        </MyProvider>        
      </body> */}



<body
  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
  suppressHydrationWarning
>

  <Providers>

    <FirstNav />
    <Navbar />

    {children}

    <Toaster />
    <Footer />

  </Providers>

</body>
    </html>
  );
}
