import { FC } from 'react';

const Button: FC = (props) => {
  return (
    <button
      className="flex h-9 rounded p-1 border-skin-dark border-solid border-2 bg-skin-accent-dark text-skin-muted hover:text-skin-accent-light cursor-default"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

type props = {
  children: HTMLElement;
  onClick: Function;
};

export default Button;
