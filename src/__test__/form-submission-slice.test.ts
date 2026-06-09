import {
  addSubmission,
  formSubmissionReducer,
  type FormSubmission,
} from '@/entities/form-submission';
import { describe, expect, it } from 'vitest';

function createSubmission(id: string): FormSubmission {
  return {
    id,
    formType: 'uncontrolled',
    createdAt: 1000,
    name: 'Alex',
    age: 20,
    email: 'alex@example.com',
    gender: 'male',
    terms: true,
    password: 'Qwerty123!',
    country: 'Germany',
    image: 'data:image/png;base64,test',
  };
}

describe('formSubmissionSlice', () => {
  it('returns initial state', () => {
    const state = formSubmissionReducer(undefined, {
      type: 'unknown',
    });

    expect(state.submissions).toEqual([]);
  });

  it('adds submission to the beginning of the list', () => {
    const firstSubmission = createSubmission('1');
    const secondSubmission = createSubmission('2');

    const stateWithFirstSubmission = formSubmissionReducer(
      undefined,
      addSubmission(firstSubmission)
    );

    const stateWithSecondSubmission = formSubmissionReducer(
      stateWithFirstSubmission,
      addSubmission(secondSubmission)
    );

    expect(stateWithSecondSubmission.submissions).toEqual([
      secondSubmission,
      firstSubmission,
    ]);
  });
});
