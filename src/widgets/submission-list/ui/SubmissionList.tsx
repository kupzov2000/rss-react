import { useAppSelector } from '@/app/hooks';
import styles from './SubmissionList.module.css';
import { SubmissionCard } from './SubmissionCard';

export function SubmissionList() {
  const submissions = useAppSelector(
    (state) => state.formSubmission.submissions
  );

  if (submissions.length === 0) {
    return;
  }

  return (
    <section className={styles.section}>
      <ul className={styles.list}>
        {submissions.map((submission) => (
          <SubmissionCard key={submission.id} submission={submission} />
        ))}
      </ul>
    </section>
  );
}
