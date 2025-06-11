import PropTypes from "prop-types";
import axios from "axios";

import { useTheme } from "../../context/ThemeContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faX } from "@fortawesome/free-solid-svg-icons";

const EditProfileModal = ({ isOpen, setIsOpen, userData, setUserData }) => {
  const { theme } = useTheme();

  if (isOpen) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(false);
        }}
        className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`relative w-1/3 h-2/3 bg-${theme}-background bg-opacity-95 rounded-md bg-center border-2 border-${theme}-primary overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-8">
            <h2 className={`text-3xl font-bold text-${theme}-primary`}>
              Editar perfil
            </h2>
            <button
              className={`font-bold bg-${theme}-primary text-${theme}-text rounded-md py-1 px-2 transition hover:bg-${theme}-secondary hover:text-${theme}-primary`}
              onClick={() => setIsOpen(false)}
            >
              <FontAwesomeIcon icon={faX} />
            </button>
          </div>

          <div className="p-8 flex flex-col items-center justify-center gap-4">
            <div
              className={`w-full h-1/2 flex items-center justify-between py-4 px-8 bg-${theme}-background border-2 border-${theme}-primary rounded-md hover:bg-${theme}-background hover:brightness-125 hover:cursor-pointer transition `}
            >
              <div className="flex w-full flex-col justify-center">
                <h2 className="text-xl mb-1">Imagen de perfil</h2>
                <div className="w-full flex gap-4 items-center">
                  <input
                    type="text"
                    className={`w-full bg-${theme}-background text-${theme}-text border-2 border-${theme}-primary rounded-md py-1 px-2
                    focus:outline-none focus:border-${theme}-primary transition`}
                    placeholder="URL de la imagen"
                    value={userData.imageURL}
                    onChange={(e) =>
                      setUserData((prevState) => ({
                        ...prevState,
                        imageURL: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
            <button
              onClick={async () => {
                const newImageURL = document.querySelector("input").value;
                setUserData((prevState) => ({
                  ...prevState,
                  imageURL: newImageURL,
                }));
                try {
                  const response = await axios.put(
                    `${import.meta.env.VITE_API_URL}/user/data`,
                    {
                      username: userData.username,
                      imageURL: newImageURL,
                    }
                  );
                  if (response.status !== 200) {
                    console.error("Error al actualizar la imagen:", response);
                    return;
                  }
                  setIsOpen(false);
                } catch (e) {
                  console.error("Error al actualizar la imagen:", e);
                }
              }}
              className={`font-bold bg-${theme}-primary text-${theme}-text rounded-md py-1 px-2 transition hover:bg-${theme}-secondary hover:text-${theme}-primary`}
            >
              <FontAwesomeIcon icon={faUpload} /> Guardar cambios
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default EditProfileModal;

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};
