import React from "react";
import Layout from "./src/components/layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

const CDN_BASE = process.env.UOFG_WC_CDN_BASE_URL?.trim() || "https://cdn.jsdelivr.net/npm";
const UOFG_WEB_COMPONENTS_BASE = `@uoguelph/web-components@${
  process.env.UOFG_WC_VERSION?.trim() || "1.x.x"
}/dist/uofg-web-components`;

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link rel="preconnect" href="https://fonts.googleapis.com" key="https://fonts.googleapis.com" />,
    <link rel="preconnect" href="https://fonts.gstatic.com" key="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      key="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      rel="stylesheet"
    />,
    <link
      rel="stylesheet"
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
    />,
    <script
      type="module"
      src={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
    ></script>,
  ]);
  setPostBodyComponents([
    <script
      key="https://kit.fontawesome.com/7993323d0c.js"
      src="https://kit.fontawesome.com/7993323d0c.js"
      crossOrigin="anonymous"
      defer
    />,
  ]);
};
