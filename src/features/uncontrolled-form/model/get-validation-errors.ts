import { ValidationError } from 'yup';
import type { FormErrors } from './types';

export function getValidationErrors(error: unknown) {
  const errors: FormErrors = {};

  if (!(error instanceof ValidationError)) {
    return errors;
  }

  error.inner.forEach((validationError) => {
    const path = validationError.path;

    if (
      path === 'name' ||
      path === 'age' ||
      path === 'email' ||
      path === 'gender' ||
      path === 'terms' ||
      path === 'password' ||
      path === 'confirmPassword' ||
      path === 'country'
    ) {
      errors[path] = validationError.message;
    }
  });

  return errors;
}
