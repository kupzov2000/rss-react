import type { FormSubmission } from '@/entities/form-submission';

import styles from './SubmissionList.module.css';

interface SubmissionCardProps {
  submission: FormSubmission;
}

export function SubmissionCard({ submission }: SubmissionCardProps) {
  return (
    <li className={styles.card}>
      <h3>{submission.name}</h3>

      <dl className={styles.details}>
        <div>
          <dt>Form type</dt>
          <dd>{submission.formType}</dd>
        </div>

        <div>
          <dt>Age</dt>
          <dd>{submission.age}</dd>
        </div>

        <div>
          <dt>Email</dt>
          <dd>{submission.email}</dd>
        </div>

        <div>
          <dt>Gender</dt>
          <dd>{submission.gender}</dd>
        </div>

        <div>
          <dt>Country</dt>
          <dd>{submission.country}</dd>
        </div>

        <div>
          <dt>Terms accepted</dt>
          <dd>{submission.terms ? 'Yes' : 'No'}</dd>
        </div>
      </dl>
    </li>
  );
}
