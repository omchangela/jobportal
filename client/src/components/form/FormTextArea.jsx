import styles from './styles/FormTextArea.module.css';

export default function FormTextArea({
  placeholder,
  label,
  register,
  required,
}) {
  return (
    <textarea
      {...register(label, { required })}
      id={label}
      rows="2"
      placeholder={placeholder}
      className={styles.textarea}
    />
  );
}
