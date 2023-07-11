import React from "react"
import { Helmet } from "react-helmet"

export default ({ id }) => {
  return (
    <>
      <div id={"AppArmorAlertID_" + id}></div>
      <Helmet>
        <script src={"https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id}></script>
      </Helmet>
    </>
  )
}
