import React from 'react';
import Link from 'next/link';

import NavBarItem from './NavBarItem';

export interface LinkPageParams {
  children: React.ReactNode;
  href: string;
  className?: string;
  icon?: React.ReactNode;
  tabIndex?: number;
  testId?: string
}

const PageLink = ({ children, href, className, icon, tabIndex, testId }: LinkPageParams) => {
  return (
    <Link legacyBehavior href={href}>
      <a>
        <NavBarItem href={href} className={className} icon={icon} tabIndex={tabIndex} testId={testId}>
          {children}
        </NavBarItem>
      </a>
    </Link>
  );
};

export default PageLink;
