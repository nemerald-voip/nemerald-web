import React from 'react';
import BlogLayout from '@theme-original/BlogLayout';

export default function AccessibleBlogLayout({ toc, ...props }) {
    return <BlogLayout {...props} toc={toc ? <nav aria-label="On this page">{toc}</nav> : undefined} />;
}
