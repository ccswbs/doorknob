import React from "react"
import { Helmet } from "react-helmet"

const AppArmorAlert = ({ id = "163" }) => {
  return (
    <>
      <div id={"AppArmorAlertID_" + id}></div>
      <Helmet>
        <script
          id="AppArmorAlertScriptID"
          type="text/javascript"
          src={"https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id}
          defer
        ></script>
      </Helmet>
    </>
  )
}

export default AppArmorAlert
