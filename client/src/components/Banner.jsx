import Text from './ui/Text';
import styles from './styles/Banner.module.css';

export default function Banner({ image, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <Text step={7} weight="400">
          {title}
        </Text>
      </div>
      <div className={styles.image}>
        <img src={image} alt="" />
      </div>
    </div>
  );
}
