import styles from './styles/Input.module.css';

export default function Input({
  input,
  setInput,
  variant,
  placeholder,
  label,
  name,
  type = 'text',
}) {
  const inputVariant = variant == 'large' ? styles.largeInput : '';

  return (
    <input
      id={label}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`${styles.input} ${inputVariant}`}
      value={input}
      onChange={(e) => setInput(e.target.value)}
    />
  );
}
