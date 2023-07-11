import React, { useEffect } from "react"

const AppArmorAlert = () => {
  useEffect(() => {
    const id = process.env.GATSBY_APP_ARMOR_ALERT_ID || "163"

    // Remove any existing AppArmorAlerts with the same ID to prevent duplicates
    document.querySelectorAll("#AppArmorAlertID_" + id).forEach(e => e.remove())

    const container = document.createElement("div")
    container.id = "AppArmorAlertID_" + id;

    // Need to load the script with the, otherwise the app armor script will not find the container
    const script = document.createElement("script")
    script.src = "https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id
    container.appendChild(script)

    document.body.prepend(container)
  })

  return <></>
}

export default AppArmorAlert
