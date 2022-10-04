import React from 'react';

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
    setPostBodyComponents([
        <script
            key="https://kit.fontawesome.com/7993323d0c.js"
            src="https://kit.fontawesome.com/7993323d0c.js"
            crossOrigin="anonymous"
            defer
        />
    ])
}