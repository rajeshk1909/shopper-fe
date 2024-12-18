import type { Metadata } from "next"
import "./globals.css"
import { Lexend } from "next/font/google"
import { ToastProvider } from "@/context/ToastProvider"
import "react-toastify/dist/ReactToastify.css"

export const metadata: Metadata = {
  title: "Shopper",
  description: "Generated by create next app",
}

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${lexend.className} text-[#555] font-medium`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  )
}
