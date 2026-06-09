function hasDigit(value: string) {
  return [...value].some((character) => character >= '0' && character <= '9');
}

function hasUppercase(value: string) {
  return [...value].some((character) => character >= 'A' && character <= 'Z');
}

function hasLowercase(value: string) {
  return [...value].some((character) => character >= 'a' && character <= 'z');
}

function hasSpecialCharacter(value: string) {
  return [...value].some((character) => {
    const isDigit = character >= '0' && character <= '9';
    const isUppercase = character >= 'A' && character <= 'Z';
    const isLowercase = character >= 'a' && character <= 'z';

    return !isDigit && !isUppercase && !isLowercase;
  });
}

export function getPasswordError(password: string) {
  if (!hasDigit(password)) {
    return 'Password must contain 1 digit';
  }

  if (!hasUppercase(password)) {
    return 'Password must contain 1 uppercase letter';
  }

  if (!hasLowercase(password)) {
    return 'Password must contain 1 lowercase letter';
  }

  if (!hasSpecialCharacter(password)) {
    return 'Password must contain 1 special character';
  }

  return null;
}

export function isStrongPassword(password: string) {
  return getPasswordError(password) === null;
}
