import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

const BERelatedLinks = () => {
  return (
    <>
      <div className="be-ix-link-block" dangerouslySetInnerHTML={{__html: "<!--Link Block Target Div--></>"}}></div>
      <Helmet>
        <script type="text/javascript" src="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"></script>
      </Helmet>
    </>
  )
}

export default BERelatedLinks