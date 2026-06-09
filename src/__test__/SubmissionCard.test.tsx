import { render, screen, act } from '@testing-library/react';
import { describe, expect, it, vi, afterEach } from 'vitest';
import type { FormSubmission } from '@/entities/form-submission';
import styles from '@/widgets/submission-list/ui/SubmissionList.module.css';
import { SubmissionCard } from '@/widgets/submission-list/ui/SubmissionCard';

const HIGHLIGHT_DURATION_MS = 3000;
const OLD_SUBMISSION_DELAY_MS = 4000;

function createSubmission(createdAt: number): FormSubmission {
  return {
    id: '1',
    formType: 'react-hook-form',
    createdAt,
    name: 'Alex',
    age: 20,
    email: 'alex@example.com',
    gender: 'male',
    terms: true,
    password: 'abc',
    country: 'Germany',
    image: 'data:image/png;base64,test',
  };
}

describe('SubmissionCard', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders submitted data and image', () => {
    render(<SubmissionCard submission={createSubmission(Date.now())} />);

    expect(screen.getByRole('img', { name: /alex profile/i })).toHaveAttribute(
      'src',
      'data:image/png;base64,test'
    );

    expect(screen.getByText('Alex')).toBeInTheDocument();
    expect(screen.getByText('Germany')).toBeInTheDocument();
  });

  it('highlights new submission and removes highlight later', () => {
    vi.useFakeTimers();

    render(<SubmissionCard submission={createSubmission(Date.now())} />);

    const card = screen.getByRole('listitem');

    expect(card).toHaveClass(styles.highlightedCard);

    act(() => {
      vi.advanceTimersByTime(HIGHLIGHT_DURATION_MS);
    });

    expect(card).not.toHaveClass(styles.highlightedCard);
  });

  it('does not highlight old submission', () => {
    render(
      <SubmissionCard
        submission={createSubmission(Date.now() - OLD_SUBMISSION_DELAY_MS)}
      />
    );

    expect(screen.getByRole('listitem')).not.toHaveClass(
      styles.highlightedCard
    );
  });
});
