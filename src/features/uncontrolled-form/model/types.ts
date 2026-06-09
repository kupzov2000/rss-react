type FieldName =
  | 'name'
  | 'age'
  | 'email'
  | 'gender'
  | 'terms'
  | 'password'
  | 'confirmPassword'
  | 'country'
  | 'image';

export type FormErrors = Partial<Record<FieldName, string>>;
