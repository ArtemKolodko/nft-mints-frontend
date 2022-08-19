import { useNavigate } from "react-router-dom";
import Logo from "../../assets/imgs/DJ3N Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faPlus } from "@fortawesome/free-solid-svg-icons";

import "./create-home.styles.scss";

const CreateHome = () => {
  const navigate = useNavigate();

  return (
    <div className="create-home">
      <div className="create-home__header">
        <div className="create-home__logo">
          <img src={Logo} alt="logo" />
        </div>
        <h1 className="create-home__title">DJ3N</h1>
      </div>

      <h3 className="create-home__subtitle"> Create Collectible</h3>
      <button
        className="create-home__collectible"
        onClick={() => navigate("create-collectible")}
      >
        <FontAwesomeIcon icon={faUpload} size="lg" />
      </button>

      <h3 className="create-home__subtitle">Create Access Pass</h3>
      <button
        className="create-home__pass"
        onClick={() => navigate("create-access-pass")}
      >
        <div className="create-home__pass--top"></div>
        <div className="create-home__pass--content">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </div>
        <div className="create-home__pass--bottom"></div>
      </button>
    </div>
  );
};

export default CreateHome;
