import PropTypes from 'prop-types';
import axios from 'axios';
import { Upload } from 'lucide-react';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Button from '../ui/Button';

const EditProfileModal = ({ isOpen, setIsOpen, userData, setUserData }) => (
  <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Editar perfil">
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-sm text-kp-muted mb-2">URL de imagen de perfil</p>
        <Input
          type="text"
          placeholder="https://..."
          value={userData.imageURL}
          onChange={(e) => setUserData(prev => ({ ...prev, imageURL: e.target.value }))}
        />
      </div>
      <Button
        variant="filled"
        onClick={async () => {
          const newImageURL = userData.imageURL;
          try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/user/data`, {
              username: userData.username,
              imageURL: newImageURL,
            });
            if (response.status === 200) setIsOpen(false);
          } catch (e) {
            console.error('Error al actualizar la imagen:', e);
          }
        }}
      >
        <Upload size={14} /> Guardar cambios
      </Button>
    </div>
  </Modal>
);

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};

export default EditProfileModal;
