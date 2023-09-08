import React from "react"
import { Script } from "gatsby"

const AppArmorAlert = ({ id = "163" }) => {
  return (
    <>
      <div id={"AppArmorAlertID_" + id}></div>
      <Script
        src={"https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id}
        strategy="post-hydrate"
      ></Script>
    </>
  )
}

export default AppArmorAlert
