import React from 'react';

import NavBarItem from './NavBarItem';
import { LinkPageParams } from './PageLink';

const AnchorLink = ({ children, href, className, icon, tabIndex, testId }: LinkPageParams) => {
  return (
    <a href={href}>
      <NavBarItem href={href} className={className} icon={icon} tabIndex={tabIndex} testId={testId}>
        {children}
      </NavBarItem>
    </a>
  );
};

export default AnchorLink;
