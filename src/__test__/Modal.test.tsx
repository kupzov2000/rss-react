import { Modal } from '@/shared/ui/modal';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

function ModalTestWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button type="button" onClick={openModal}>
        Open modal
      </button>

      <Modal isOpen={isOpen} onClose={closeModal} title="Test modal">
        <button type="button">Focusable content</button>
      </Modal>
    </div>
  );
}

describe('Modal', () => {
  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()} title="Hidden modal">
        <p>Hidden content</p>
      </Modal>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });

  it('renders dialog content through portal when opened', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    await user.click(screen.getByRole('button', { name: /open modal/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Focusable content')).toBeInTheDocument();
  });

  it('has accessible dialog attributes', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    await user.click(screen.getByRole('button', { name: /open modal/i }));

    const dialog = screen.getByRole('dialog', { name: /test modal/i });

    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('closes by close button', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    await user.click(screen.getByRole('button', { name: /open modal/i }));
    await user.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes by Escape key', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    await user.click(screen.getByRole('button', { name: /open modal/i }));
    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('returns focus to opener after close', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    const openButton = screen.getByRole('button', { name: /open modal/i });

    await user.click(openButton);
    await user.keyboard('{Escape}');

    expect(openButton).toHaveFocus();
  });

  it('closes by outside click', async () => {
    const user = userEvent.setup();

    render(<ModalTestWrapper />);

    await user.click(screen.getByRole('button', { name: /open modal/i }));

    const dialog = screen.getByRole('dialog');
    const overlay = dialog.parentElement;

    if (!overlay) {
      throw new Error('Modal overlay was not found');
    }

    await user.click(overlay);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
