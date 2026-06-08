type FieldName =
  | 'name'
  | 'age'
  | 'email'
  | 'gender'
  | 'terms'
  | 'password'
  | 'confirmPassword'
  | 'country';

export type FormErrors = Partial<Record<FieldName, string>>;
