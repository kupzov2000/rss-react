import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
  addSubmission,
  createFormSubmissionSchema,
  removeConfirmPassword,
} from '@/entities/form-submission';
import { useState, type FormEvent } from 'react';
import { getUncontrolledFormValues } from '../model/get-uncontrolled-form-value';
import type { FormErrors } from '../model/types';
import { getValidationErrors } from '../model/get-validation-errors';
import styles from '@/shared/ui/form/Form.module.css';

interface Props {
  onSuccess: () => void;
}

export function UncontrolledForm({ onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.country.countries);
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const values = getUncontrolledFormValues(formData);
    const schema = createFormSubmissionSchema(countries);

    try {
      const validatedValues = schema.validateSync(values, {
        abortEarly: false,
      });

      const submissionValues = removeConfirmPassword(validatedValues);

      dispatch(
        addSubmission({
          id: crypto.randomUUID(),
          formType: 'uncontrolled',
          ...submissionValues,
        })
      );

      setErrors({});
      event.currentTarget.reset();
      onSuccess();
    } catch (error) {
      setErrors(getValidationErrors(error));
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-name">
          Name
        </label>
        <input
          className={styles.input}
          id="uncontrolled-name"
          type="text"
          name="name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-age">
          Age
        </label>
        <input
          className={styles.input}
          id="uncontrolled-age"
          type="number"
          name="age"
        />
        {errors.age && <p className={styles.error}>{errors.age}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-email">
          Email
        </label>
        <input
          className={styles.input}
          id="uncontrolled-email"
          type="email"
          name="email"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.gender}>
        <p className={styles.genderTitle}>Gender</p>

        <div className={styles.radioGroup}>
          <label className={styles.option} htmlFor="uncontrolled-gender-male">
            <input
              id="uncontrolled-gender-male"
              type="radio"
              name="gender"
              value="male"
            />
            Male
          </label>
          <label className={styles.option} htmlFor="uncontrolled-gender-female">
            <input
              id="uncontrolled-gender-female"
              type="radio"
              name="gender"
              value="female"
            />
            Female
          </label>
          <label className={styles.option} htmlFor="uncontrolled-gender-other">
            <input
              id="uncontrolled-gender-other"
              type="radio"
              name="gender"
              value="other"
            />
            Other
          </label>
        </div>

        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.checkboxLabel} htmlFor="uncontrolled-terms">
          <input id="uncontrolled-terms" type="checkbox" name="terms" />
          Accept Terms and Conditions agreement
        </label>
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-password">
          Password
        </label>
        <input
          className={styles.input}
          id="uncontrolled-password"
          type="password"
          name="password"
        />
        <p className={styles.error}>{errors.password}</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-confirm-password">
          Confirm password
        </label>
        <input
          className={styles.input}
          id="uncontrolled-confirm-password"
          type="password"
          name="confirmPassword"
        />
        <p className={styles.error}>{errors.confirmPassword}</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="uncontrolled-country">
          Country
        </label>
        <input
          className={styles.input}
          id="uncontrolled-country"
          type="text"
          name="country"
          list="uncontrolled-countries"
        />

        <datalist id="uncontrolled-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>

        <p className={styles.error}>{errors.country}</p>
      </div>

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
    </form>
  );
}
