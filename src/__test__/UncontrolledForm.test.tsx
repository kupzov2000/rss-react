import { afterEach, describe, expect, it, vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UncontrolledForm } from '@/features/uncontrolled-form';

import { renderWithProviders } from './test-utilites';

describe('UncontrolledForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders all required fields', () => {
    renderWithProviders(<UncontrolledForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();

    expect(screen.getByText(/^gender$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^male$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^female$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^other$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/^country$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('does not show validation errors before submit', () => {
    renderWithProviders(<UncontrolledForm onSuccess={vi.fn()} />);

    expect(
      screen.queryByText(/^Name must start with a capital letter$/i)
    ).not.toBeInTheDocument();

    expect(screen.queryByText(/^Age is required$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Email is invalid$/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Gender is invalid$/i)).not.toBeInTheDocument();

    expect(
      screen.queryByText(/^You must accept terms and conditions$/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/^Password is required$/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/^Confirm password is required$/i)
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText(/^Country must exist in the country list$/i)
    ).not.toBeInTheDocument();

    expect(screen.queryByText(/^Image is required$/i)).not.toBeInTheDocument();
  });

  it('shows validation errors after submit with empty fields', async () => {
    const user = userEvent.setup();

    renderWithProviders(<UncontrolledForm onSuccess={vi.fn()} />);

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/^Name must start with a capital letter$/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/^Age is required$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Email is invalid$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Gender is invalid$/i)).toBeInTheDocument();

    expect(
      screen.getByText(/^You must accept terms and conditions$/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/^Password is required$/i)).toBeInTheDocument();

    expect(
      screen.getByText(/^Confirm password is required$/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/^Country must exist in the country list$/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/^Image is required$/i)).toBeInTheDocument();
  });

  it('shows password strength hint only after password input', async () => {
    const user = userEvent.setup();

    renderWithProviders(<UncontrolledForm onSuccess={vi.fn()} />);

    expect(
      screen.queryByText(/^Password must contain 1 digit$/i)
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/^password$/i), 'abc');

    expect(
      screen.getByText(/^Password must contain 1 digit$/i)
    ).toBeInTheDocument();
  });

  it('shows validation error for weak password after submit', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    renderWithProviders(<UncontrolledForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/^name$/i), 'Alex');
    await user.type(screen.getByLabelText(/^age$/i), '20');
    await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com');
    await user.click(screen.getByLabelText(/^male$/i));
    await user.click(screen.getByLabelText(/accept terms/i));
    await user.type(screen.getByLabelText(/^password$/i), 'abc');
    await user.type(screen.getByLabelText(/^confirm password$/i), 'abc');
    await user.type(screen.getByLabelText(/^country$/i), 'Germany');

    await user.click(screen.getByRole('button', { name: /submit/i }));

    expect(
      await screen.findByText(/^Password must contain 1 digit$/i)
    ).toBeInTheDocument();

    expect(onSuccess).not.toHaveBeenCalled();
  });
});
