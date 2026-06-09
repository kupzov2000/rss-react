import { useState } from 'react';

import { Modal } from '@/shared/ui/modal';
import { UncontrolledForm } from '@/features/uncontrolled-form';
import { SubmissionList } from '@/widgets/submission-list';
import { HookForm } from '@/features/hook-form';

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
        <UncontrolledForm onSuccess={closeUncontrolledModal} />
      </Modal>

      <Modal
        isOpen={isHookFormModalOpen}
        onClose={closeHookFormModal}
        title="React Hook Form"
      >
        <HookForm onSuccess={closeHookFormModal} />
      </Modal>

      <SubmissionList />
    </main>
  );
}
