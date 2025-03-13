import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from './contexts/auth-context'
import { ShoppingProvider } from './contexts/shopping-context'
import { OrderProvider } from './contexts/order-context'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Fashion Store",
  description: "Fashion Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <AuthProvider>
          <ShoppingProvider>
            <OrderProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </OrderProvider>
          </ShoppingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
