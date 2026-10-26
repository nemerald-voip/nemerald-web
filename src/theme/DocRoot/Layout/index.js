import React from 'react';
import Link from '@docusaurus/Link';
import {useDocsSidebar} from '@docusaurus/plugin-content-docs/client';
import OriginalLayout from '@theme-original/DocRoot/Layout';

function SidebarLinks({items}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.href || item.label || index}>
          {item.href ? <Link to={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {item.items && <SidebarLinks items={item.items} />}
        </li>
      ))}
    </ul>
  );
}

// The custom site header hides the classic navbar and mobile sidebar button.
export default function DocRootLayout(props) {
  const sidebar = useDocsSidebar();
  return (
    <>
      {sidebar && (
        <details className="apps-docs-menu">
          <summary>Browse app guides</summary>
          <nav aria-label="App documentation"><SidebarLinks items={sidebar.items} /></nav>
        </details>
      )}
      <OriginalLayout {...props} />
    </>
  );
}
