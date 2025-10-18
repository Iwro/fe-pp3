'use client'
import { Header } from "./components/header"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import style from "./page.module.css"
import { Provider } from 'jotai'
import { MercadoPagoProvider } from "./lib/mercadopago";

export default function mainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={style.body}>
        <ToastContainer />
        <Header/>
        <main className={style.main}>
          <MercadoPagoProvider>
            <Provider>
              {children}
            </Provider>
          </MercadoPagoProvider>
        </main>
        <footer></footer>
      </body>
    </html>
  )
}