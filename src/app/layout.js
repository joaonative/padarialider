import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-6xl mx-auto p-4">
          <Header />
          {children}
          <footer className="border-t p-8 text-center text-grey-500 mt-10">
            &copy; 2023 Todos os direitos reservados.
          </footer>
        </main>
      </body>
    </html>
  );
}
