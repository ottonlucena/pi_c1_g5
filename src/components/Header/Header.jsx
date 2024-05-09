import { useState } from 'react';
import { Button, Input, Spacer } from '@nextui-org/react';

const Header = () => {
  // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });
  // const isTablet = useMediaQuery({ minDeviceWidth: 768, maxDeviceWidth: 1224 });
  // const isMobile = useMediaQuery({ maxDeviceWidth: 768 });
  const [searchVisible, setSearchVisible] = useState(true);

  // const handleSearchClick = () => {
  //   setSearchVisible(!searchVisible);
  // };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        backdropFilter: 'blur(5px)',
        zIndex: 1000,
      }}
    ></nav>
  );
};

export default Header;
