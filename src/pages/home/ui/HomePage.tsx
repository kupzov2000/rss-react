import { useState } from 'react';

import { Modal } from '@/shared/ui/modal';

export function HomePage() {
  const [isUncontrolledModalOpen, setIsUncontrolledModalOpen] = useState(false);
  const [isHookFormModalOpen, setIsHookFormModalOpen] = useState(false);

  function openUncontrolledModal() {
    setIsUncontrolledModalOpen(true);
  }

  function closeUncontrolledModal() {
    setIsUncontrolledModalOpen(false);
  }

  function openHookFormModal() {
    setIsHookFormModalOpen(true);
  }

  function closeHookFormModal() {
    setIsHookFormModalOpen(false);
  }

  return (
    <main>
      <div>
        <button type="button" onClick={openUncontrolledModal}>
          Open uncontrolled form
        </button>

        <button type="button" onClick={openHookFormModal}>
          Open controlled Form
        </button>
      </div>

      <Modal
        isOpen={isUncontrolledModalOpen}
        onClose={closeUncontrolledModal}
        title="Uncontrolled form"
      >
        <p>неконтролируемая форма</p>
      </Modal>

      <Modal
        isOpen={isHookFormModalOpen}
        onClose={closeHookFormModal}
        title="React Hook Form"
      >
        <p>контролируемая форма</p>
      </Modal>
    </main>
  );
}
