import type { FormSubmissionValues } from '../model/types';

export function removeConfirmPassword(values: FormSubmissionValues) {
  return {
    name: values.name,
    age: values.age,
    email: values.email,
    gender: values.gender,
    terms: values.terms,
    password: values.password,
    country: values.country,
  };
}
