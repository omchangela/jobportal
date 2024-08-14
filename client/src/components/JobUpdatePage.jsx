import Banner from './Banner';
import shapes from '../assets/jobImage.png';
import styles from './styles/JobUpdatePage.module.css';

export default function JobUpdatePage({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.banner}>
        <Banner image={shapes} title="Recruiter add job details here" />
      </div>
    </div>
  );
}
