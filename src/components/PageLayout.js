import React from 'react';
import Layout from '@theme/Layout';

// Custom pages supply their own main landmark; blog pages already have one.
export default function PageLayout({ children, ...props }) {
    return <Layout {...props}><main>{children}</main></Layout>;
}
