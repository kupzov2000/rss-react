import type { FormSubmission } from '@/entities/form-submission';

import styles from './SubmissionList.module.css';
import { useEffect, useState } from 'react';

interface SubmissionCardProps {
  submission: FormSubmission;
}

const HIGHLIGHT_DURATION_MS = 3000;

export function SubmissionCard({ submission }: SubmissionCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(() => {
    return Date.now() - submission.createdAt < HIGHLIGHT_DURATION_MS;
  });

  useEffect(() => {
    if (!isHighlighted) {
      return;
    }

    const timeoutId = globalThis.setTimeout(() => {
      setIsHighlighted(false);
    }, HIGHLIGHT_DURATION_MS);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [isHighlighted]);

  return (
    <li
      className={`${styles.card} ${
        isHighlighted ? styles.highlightedCard : ''
      }`}
    >
      <img
        className={styles.image}
        src={submission.image}
        alt={`${submission.name} profile`}
      />

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
