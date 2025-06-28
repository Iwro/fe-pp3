import { Header } from "./components/header"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import style from "./page.module.css"

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
          {children}
        </main>
        <footer></footer>
      </body>
    </html>
  )
}