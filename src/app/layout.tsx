import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/sass/main.scss";
import { GlobalProvider } from "@/providers/GlobalContext";
import { UserProvider } from "@/providers/UserContext";
import { ScheduleProvider } from "@/providers/ScheduleContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "de Sá Incorporações",
  description: "Imóveis de Qualidade",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer position="bottom-right" autoClose={2000} />
        <GlobalProvider>
          <UserProvider>
            <ScheduleProvider>{children}</ScheduleProvider>
          </UserProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
