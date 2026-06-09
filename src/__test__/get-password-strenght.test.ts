import {
  getPasswordError,
  isStrongPassword,
} from '@/shared/lib/password/get-password-strenght';
import { describe, expect, it } from 'vitest';

describe('password helpers', () => {
  it('requires digit first', () => {
    expect(getPasswordError('abc')).toBe('Password must contain 1 digit');
  });

  it('requires uppercase after digit exists', () => {
    expect(getPasswordError('abc1')).toBe(
      'Password must contain 1 uppercase letter'
    );
  });

  it('requires lowercase after digit and uppercase exist', () => {
    expect(getPasswordError('ABC1')).toBe(
      'Password must contain 1 lowercase letter'
    );
  });

  it('requires special character after digit, uppercase and lowercase exist', () => {
    expect(getPasswordError('Abc1')).toBe(
      'Password must contain 1 special character'
    );
  });

  it('returns null for strong password', () => {
    expect(getPasswordError('Abc1!')).toBeNull();
  });

  it('detects strong password', () => {
    expect(isStrongPassword('Abc1!')).toBe(true);
    expect(isStrongPassword('abc')).toBe(false);
  });
});
