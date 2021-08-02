import { useRouter } from 'next/router';
import HeaderItem from '../../atoms/HeaderItem/HeaderItem';
import Button from '../../atoms/Button/Button';
import NavBarItem from '../../atoms/NavBarItem/NavBarItem';
import DropdownMenu from '../DropdownMenu/DropdownMenuComponent';

const HeaderComponent = ({ activeContent }) => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('api/auth/logout');
  };

  return (
    <div className="flex h-20 bg-skin-accent-light items-center justify-between">
      <h1 className="pl-3 text-5xl font-light tracking-widest text-skin-muted">
        {activeContent}
      </h1>
      <div className="flex justify-center items-center">
        <HeaderItem
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        >
          <DropdownMenu />
        </HeaderItem>
      </div>
    </div>
  );
};
export default HeaderComponent;
