import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  addSubmission,
  createFormSubmissionSchema,
  removeConfirmPassword,
  // formSubmissionSchema,
  type FormSubmissionValues,
} from '@/entities/form-submission';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import styles from '@/shared/ui/form/Form.module.css';
import { useMemo } from 'react';

interface Props {
  onSuccess: () => void;
}

export function HookForm({ onSuccess }: Props) {
  const dispatch = useAppDispatch();
  const countries = useAppSelector((state) => state.country.countries);

  const schema = useMemo(
    () => createFormSubmissionSchema(countries),
    [countries]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormSubmissionValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      terms: false,
      password: '',
      confirmPassword: '',
      country: '',
    },
  });

  function onSubmit(values: FormSubmissionValues) {
    const submissionValues = removeConfirmPassword(values);

    dispatch(
      addSubmission({
        id: crypto.randomUUID(),
        formType: 'react-hook-form',
        ...submissionValues,
      })
    );

    reset();
    onSuccess();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-name">
          Name
        </label>
        <input
          className={styles.input}
          id="hook-form-name"
          type="text"
          {...register('name')}
        />
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-age">
          Age
        </label>
        <input
          className={styles.input}
          id="hook-form-age"
          type="number"
          {...register('age')}
        />
        {errors.age && <p className={styles.error}>{errors.age.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-email">
          Email
        </label>
        <input
          className={styles.input}
          id="hook-form-email"
          type="email"
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>

      <div className={styles.gender}>
        <p className={styles.genderTitle}>Gender</p>

        <div className={styles.radioGroup}>
          <label className={styles.option} htmlFor="hook-form-gender-male">
            <input
              id="hook-form-gender-male"
              type="radio"
              value="male"
              {...register('gender')}
            />
            Male
          </label>

          <label className={styles.option} htmlFor="hook-form-gender-female">
            <input
              id="hook-form-gender-female"
              type="radio"
              value="female"
              {...register('gender')}
            />
            Female
          </label>

          <label className={styles.option} htmlFor="hook-form-gender-other">
            <input
              id="hook-form-gender-other"
              type="radio"
              value="other"
              {...register('gender')}
            />
            Other
          </label>
        </div>

        {errors.gender && (
          <p className={styles.error}>{errors.gender.message}</p>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.checkboxLabel} htmlFor="hook-form-terms">
          <input id="hook-form-terms" type="checkbox" {...register('terms')} />
          Accept Terms and Conditions agreement
        </label>
        {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-password">
          Password
        </label>
        <input
          className={styles.input}
          id="hook-form-password"
          type="password"
          {...register('password')}
        />
        <p className={styles.error}>{errors.password?.message}</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-confirm-password">
          Confirm password
        </label>
        <input
          className={styles.input}
          id="hook-form-confirm-password"
          type="password"
          {...register('confirmPassword')}
        />
        <p className={styles.error}>{errors.confirmPassword?.message}</p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="hook-form-country">
          Country
        </label>

        <input
          className={styles.input}
          id="hook-form-country"
          type="text"
          list="hook-form-countries"
          {...register('country')}
        />

        <datalist id="hook-form-countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
        <p className={styles.error}>{errors.country?.message}</p>
      </div>

      <button className={styles.submitButton} type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
