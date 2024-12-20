"use client"

import "./globals.css"
import { Lexend } from "next/font/google"
import { ToastProvider } from "@/context/ToastProvider"
// import "react-toastify/dist/ReactToastify.css"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store"
import Loading from "@/components/Loader"

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
})

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={`${lexend.className} text-[#555] font-medium font-sans`}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>{children}</ToastProvider>
      </PersistGate>
    </Provider>
  </div>
)

export default ClientRootLayout
