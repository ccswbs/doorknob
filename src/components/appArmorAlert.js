import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

const AppArmorAlert = ({ id }) => {
  useEffect(() => {
    const appArmorID = "AppArmorAlertID_" + id

    // Remove any existing AppArmorAlerts with the same ID to prevent duplicates
    document.querySelectorAll("#" + appArmorID).forEach((e) => e.remove());

    const container = document.createElement("div")
    container.id = appArmorID
    document.body.prepend(container)
  }, [id])

  return (
    <>
      <Helmet>
        <script src={"https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id}></script>
      </Helmet>
    </>
  )
}

export default AppArmorAlert
