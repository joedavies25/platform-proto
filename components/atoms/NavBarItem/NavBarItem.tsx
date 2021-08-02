import { useContext, FC } from 'react';
import { globalContext } from '../../../context/globalStore';

const NavBarItem: FC = ({ children, content }) => {
  const { dispatch } = useContext(globalContext);

  const handleClick = () => {
    return dispatch({ type: 'changeContent', payload: content });
  };

  return (
    <div
      className="flex flex-col h-20 p-2 text-skin-base justify-center items-center text-skin-muted hover:text-skin-accent-light"
      onClick={handleClick}
    >
      {children}
      {/* <p className="font-thin">{content}</p> */}
    </div>
  );
};

export default NavBarItem;
