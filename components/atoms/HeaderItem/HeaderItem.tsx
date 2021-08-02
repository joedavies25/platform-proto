import { useState } from 'react';

const HeaderItem = ({ children, icon }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className="mr-3 flex justify-center items-center h-10 text-skin-inverted hover:text-skin-muted cursor-default"
        onClick={() => setOpen(!open)}
      >
        {icon}
      </div>
      {open && children}
    </div>
  );
};

export default HeaderItem;
