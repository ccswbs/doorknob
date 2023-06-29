import React from 'react';

const SkipLink = ({ mainContent }) => (
  <nav aria-label="Skip links">
    <a className="visually-hidden-focusable skiplink" href={mainContent}>
      Skip to main content
    </a>
  </nav>
)

export default SkipLink
