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
  image: File | null;
}

export interface FormSubmission {
  id: string;
  formType: FormType;
  createdAt: number;
  name: string;
  age: number;
  email: string;
  gender: Gender;
  terms: boolean;
  password: string;
  country: string;
  image: string;
}