import { Link } from "react-router-dom";

function HeaderLink({ link, children, onClick, className }) {
  return (
    <Link to={link} onClick={onClick} className={`hover:text-secondary hover:scale-105 transition duration-300 ${className}`}>
      {children}
    </Link>
  );
}

export default HeaderLink;
