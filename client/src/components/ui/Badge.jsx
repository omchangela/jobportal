import styles from './styles/Badge.module.css';
import Text from './Text';

export default function Badge({ children, shape }) {
  const shapeStyle = styles[shape];

  return (
    <div className={`${styles.badge} ${shapeStyle}`}>
      <Text weight="500">{children}</Text>
    </div>
  );
}
