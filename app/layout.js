import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import ClerkErrorBoundary from "@/components/clerk-error-boundary";
import UserSync from "@/components/user-sync";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Welth",
  description: "One stop Finance Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-sm.png" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <ClerkErrorBoundary>
          <UserSync />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                DEVELOPED BY ANXWEETA
              </p>
            </div>
          </footer>
        </ClerkErrorBoundary>
      </body>
    </html>
  );
}
