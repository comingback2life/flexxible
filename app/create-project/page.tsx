import { getCurrentUser } from '@/lib/session';
import Modal from './Modal';
import ProjectForm from './ProjectForm';
import { redirect } from 'next/navigation';

const CreateProject = async () => {
  const session = await getCurrentUser();
  if (!session?.user) redirect('/');
  return (
    <Modal>
      <h3 className="modal-head-text">Create new project</h3>
      <ProjectForm type="create" session={session} />
    </Modal>
  );
};

export default CreateProject;
