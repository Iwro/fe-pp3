import { Header } from "./components/header"
import style from "./page.module.css"
export default function mainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className={style.main}>{children}</main>
        <footer></footer>
      </body>
    </html>
  )
}