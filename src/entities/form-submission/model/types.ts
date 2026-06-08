export type Gender = 'male' | 'female' | 'other';

export type FormType = 'uncontrolled' | 'react-hook-form';

export interface FormSubmissionValues {
  name: string;
  age: number;
  email: string;
  gender: Gender;
  terms: boolean;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface FormSubmission extends Omit<
  FormSubmissionValues,
  'confirmPassword'
> {
  id: string;
  formType: FormType;
}
