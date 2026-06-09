import type { FormSubmission, FormSubmissionValues } from './types';

type SubmissionValues = Omit<FormSubmission, 'id' | 'formType' | 'createdAt'>;

export function createSubmissionValues(
  values: FormSubmissionValues,
  imageBase64: string
): SubmissionValues {
  return {
    name: values.name,
    age: values.age,
    email: values.email,
    gender: values.gender,
    terms: values.terms,
    password: values.password,
    country: values.country,
    image: imageBase64,
  };
}
