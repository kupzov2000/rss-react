import { getPasswordError } from '@/shared/lib/password/get-password-strenght';
import styles from './PasswordStrengthIndicator.module.css';

interface Props {
  password: string;
  shouldShow: boolean;
}

export function PasswordStrengthIndicator({ password, shouldShow }: Props) {
  if (!shouldShow) {
    return null;
  }

  const error = getPasswordError(password);

  if (error) {
    return <p className={styles.invalid}>{error}</p>;
  }

  return <p className={styles.valid}>Password is strong</p>;
}
