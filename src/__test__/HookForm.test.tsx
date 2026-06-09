import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { renderWithProviders } from './test-utilites';
import { HookForm } from '@/features/hook-form';

function createImageFile() {
  return new File(['content'], 'avatar.jpg', {
    type: 'image/jpeg',
  });
}

async function fillValidHookForm() {
  const user = userEvent.setup();

  await user.type(screen.getByLabelText(/^name$/i), 'Alex');
  await user.type(screen.getByLabelText(/^age$/i), '20');
  await user.type(screen.getByLabelText(/^email$/i), 'alex@example.com');

  await user.click(screen.getByLabelText(/^male$/i));
  await user.click(screen.getByLabelText(/accept terms/i));

  await user.type(screen.getByLabelText(/^password$/i), 'abc');
  await user.type(screen.getByLabelText(/^confirm password$/i), 'abc');

  await user.type(screen.getByLabelText(/^country$/i), 'Germany');

  await user.upload(screen.getByLabelText(/profile image/i), createImageFile());

  return user;
}

describe('HookForm', () => {
  it('renders all required fields', () => {
    renderWithProviders(<HookForm onSuccess={vi.fn()} />);

    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^age$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^male$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/accept terms/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^country$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/profile image/i)).toBeInTheDocument();
  });

  it('disables submit button when form is invalid', () => {
    renderWithProviders(<HookForm onSuccess={vi.fn()} />);

    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
  });

  it('shows real-time validation error for invalid name', async () => {
    const user = userEvent.setup();

    renderWithProviders(<HookForm onSuccess={vi.fn()} />);

    await user.type(screen.getByLabelText(/^name$/i), 'alex');

    expect(
      await screen.findByText(/name must start with a capital letter/i)
    ).toBeInTheDocument();
  });

  it('shows password strength hint after password input', async () => {
    const user = userEvent.setup();

    renderWithProviders(<HookForm onSuccess={vi.fn()} />);

    expect(
      screen.queryByText(/password must contain 1 digit/i)
    ).not.toBeInTheDocument();

    await user.type(screen.getByLabelText(/^password$/i), 'abc');

    expect(
      screen.getByText(/password must contain 1 digit/i)
    ).toBeInTheDocument();
  });

  it('does not submit when passwords do not match', async () => {
    const user = userEvent.setup();
    const onSuccess = vi.fn();

    renderWithProviders(<HookForm onSuccess={onSuccess} />);

    await user.type(screen.getByLabelText(/^password$/i), 'abc');
    await user.type(screen.getByLabelText(/^confirm password$/i), 'different');

    expect(
      await screen.findByText(/passwords must match/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeDisabled();
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it('submits valid form and stores submission', async () => {
    const onSuccess = vi.fn();
    const { store } = renderWithProviders(<HookForm onSuccess={onSuccess} />);

    const user = await fillValidHookForm();

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled();
    });

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });

    const state = store.getState();

    expect(state.formSubmission.submissions).toHaveLength(1);
    expect(state.formSubmission.submissions[0]).toMatchObject({
      formType: 'react-hook-form',
      name: 'Alex',
      age: 20,
      email: 'alex@example.com',
      gender: 'male',
      terms: true,
      country: 'Germany',
    });

    expect(state.formSubmission.submissions[0].image).toMatch(
      /^data:image\/jpeg;base64,/
    );
  });
});
