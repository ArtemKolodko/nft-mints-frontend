import './navigation-bar.styles.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCircleUser, faTicket } from "@fortawesome/free-solid-svg-icons"; //faUser, faFolder, f

export type NewUSerAlertProps = {
  openAlert: boolean;
  redirect: string;
};

const NavigationBar = ({ uuid }: { uuid?: string}) => {
  
  return (
    <div className="navigation">
      <div className="navigation__actions">
        <Link className="navigation__link" to={uuid ? "/nfts/" : ''}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
        <Link className="navigation__link" to={uuid ? `gallery/${uuid}` : ''}>
          <FontAwesomeIcon icon={faCircleUser} />
        </Link>
        <Link className="navigation__link" to={uuid ? `gallery/${uuid}` : ''}>
          <FontAwesomeIcon icon={faTicket} />
        </Link>
      </div>
    </div>
  );
};

export default NavigationBar;
//