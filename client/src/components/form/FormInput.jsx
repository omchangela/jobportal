import styles from './styles/FormInput.module.css';

export default function FormInput({
  variant,
  placeholder,
  label,
  register,
  required,
  type = 'text',
}) {
  const inputVariant = variant == 'large' ? styles.largeInput : '';

  return (
    <input
      id={label}
      type={type}
      placeholder={placeholder}
      className={`${styles.input} ${inputVariant}`}
      {...register(label, { required })}
    />
  );
}
