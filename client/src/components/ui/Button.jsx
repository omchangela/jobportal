import styles from './styles/Button.module.css';

export default function Button({
  children = 'button',
  variant = 'primary',
  onClick,
  icon,
  style,
  size,
  type = 'submit',
  disabled,
}) {
  const buttonVariant = styles[variant];
  const buttonWithIcon = icon ? styles.withIcon : '';
  const buttonSize = size == 'large' ? styles.largeButton : '';

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${buttonVariant} ${buttonWithIcon} ${buttonSize}`}
      style={{ ...style }}
      type={type}
    >
      {children}
      {icon && <div className={styles.icon}>{icon}</div>}
    </button>
  );
}
