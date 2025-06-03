import { promises as fs } from 'fs';
import styles from "./page.module.css";
import { Featured } from './components/featured';
// import { ShopData } from './interfaces/shopData';

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/src/app/public/mock.json', 'utf8');
  const data = JSON.parse(file);
      
  return (
    <main className={styles.main}>
      <Featured data={data.talleres}/>
    </main>
  );
}
