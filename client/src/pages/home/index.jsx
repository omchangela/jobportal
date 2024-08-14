import { useState } from 'react';

import Header from '../../components/Header';
import Jobs from './Jobs';
import SearchBox from './SearchBox';
import styles from './styles/index.module.css';

export default function Home() {
  const [params, setParams] = useState({});
  const setParamsObj = (val) => setParams(val);

  return (
    <div>
      <Header />
      <main className={styles.main}>
        <SearchBox setParamsObj={setParamsObj} />
        <Jobs params={params} />
      </main>
    </div>
  );
}
