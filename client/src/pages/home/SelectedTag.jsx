import { X } from 'lucide-react';
import styles from './styles/SelectedTag.module.css';
import { Text } from '../../components/ui';

export default function SelectedTag({ children, onClick }) {
  return (
    <div className={styles.tag}>
      <Text>{children.name}</Text>
      <button onClick={() => onClick(children)} type="button">
        <X />
      </button>
    </div>
  );
}
