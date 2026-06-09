import * as yup from 'yup';

import type { FormSubmissionValues, Gender } from './types';
import {
  HEIGHT,
  isAllowedImageSize,
  isAllowedImageType,
  MAX_IMAGE_SIZE_BYTES,
  WIDTH,
} from '@/shared/lib/image/image';

const MIN_LENGTH_PARTS = 2;
const GENDERS: Gender[] = ['male', 'female', 'other'];

function isValidEmail(value: string | undefined) {
  if (!value) {
    return false;
  }

  const parts = value.split('@');

  if (parts.length !== MIN_LENGTH_PARTS) {
    return false;
  }

  const [localPart, domain] = parts;

  return localPart.length > 0 && domain.includes('.');
}

export function createFormSubmissionSchema(countries: string[]) {
  const schema: yup.ObjectSchema<FormSubmissionValues> = yup.object({
    name: yup
      .string()
      .required('Name is required')
      .test(
        'starts-with-capital',
        'Name must start with a capital letter',
        (value) => {
          if (!value) {
            return false;
          }

          return value[0] === value[0].toUpperCase();
        }
      ),

    age: yup
      .number()
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return;
        }

        return value;
      })
      .typeError('Age must be a number')
      .required('Age is required')
      .min(0, 'Age cannot be negative'),

    email: yup
      .string()
      .required('Email is required')
      .test('valid-email', 'Email is invalid', isValidEmail),

    gender: yup
      .mixed<Gender>()
      .oneOf(GENDERS, 'Gender is invalid')
      .required('Gender is required'),

    terms: yup
      .boolean()
      .oneOf([true], 'You must accept terms and conditions')
      .required('Terms are required'),

    password: yup.string().required('Password is required'),

    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),

    country: yup
      .string()
      .required('Country is required')
      .oneOf(countries, 'Country must exist in the country list'),

    image: yup
      .mixed<File>()
      .required('Image is required')
      .test('file-type', 'Image must be PNG or JPEG', (value) => {
        return value instanceof File && isAllowedImageType(value);
      })
      .test(
        'file-size',
        `Image must be less than ${MAX_IMAGE_SIZE_BYTES / WIDTH / HEIGHT}MB`,
        (value) => {
          return value instanceof File && isAllowedImageSize(value);
        }
      ),
  });

  return schema;
}
