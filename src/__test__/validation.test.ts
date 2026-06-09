import { createFormSubmissionSchema } from '@/entities/form-submission';
import { describe, expect, it } from 'vitest';

const countries = ['Germany', 'Poland', 'France'];

function createValidValues() {
  return {
    name: 'Alex',
    age: 20,
    email: 'alex@example.com',
    gender: 'male',
    terms: true,
    password: 'abc',
    confirmPassword: 'abc',
    country: 'Germany',
    image: new File(['content'], 'avatar.png', {
      type: 'image/png',
    }),
  };
}

describe('formSubmissionSchema', () => {
  it('validates correct values', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(createValidValues(), {
        abortEarly: false,
      });
    }).not.toThrow();
  });

  it('rejects name without capital first letter', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          name: 'alex',
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Name must start with a capital letter');
  });

  it('rejects invalid email without regex-style overvalidation', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          email: 'alex@example',
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Email is invalid');
  });

  it('rejects negative age', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          age: -1,
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Age cannot be negative');
  });

  it('rejects mismatched passwords', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          confirmPassword: 'different',
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Passwords must match');
  });

  it('rejects country outside stored list', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          country: 'Atlantis',
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Country must exist in the country list');
  });

  it('rejects unsupported image type', () => {
    const schema = createFormSubmissionSchema(countries);

    expect(() => {
      schema.validateSync(
        {
          ...createValidValues(),
          image: new File(['content'], 'avatar.txt', {
            type: 'text/plain',
          }),
        },
        {
          abortEarly: false,
        }
      );
    }).toThrow('Image must be PNG or JPEG');
  });
});
