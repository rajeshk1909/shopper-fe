"use client"

import "./globals.css"
import { Lexend } from "next/font/google"
import { ToastProvider } from "@/context/ToastProvider"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { store, persistor } from "@/store/store"
import { DataContextProvider } from "@/context/DataProvider"

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
})

const ClientRootLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={`${lexend.className} text-[#555] font-medium font-sans`}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <DataContextProvider>
          <ToastProvider>{children}</ToastProvider>
        </DataContextProvider>
      </PersistGate>
    </Provider>
  </div>
)

export default ClientRootLayout
