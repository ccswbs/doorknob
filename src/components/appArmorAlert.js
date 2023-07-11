import React, { useEffect } from "react"

const AppArmorAlert = ({ id }) => {
  useEffect(() => {
    const appArmorID = "AppArmorAlertID_" + id

    // Remove any existing AppArmorAlerts with the same ID to prevent duplicates
    document.querySelectorAll("#" + appArmorID).forEach(e => e.remove())

    const container = document.createElement("div")
    container.id = appArmorID

    // Need to load the script with the container, otherwise the app armor script will not find the container
    const script = document.createElement("script")
    script.src = "https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id
    container.appendChild(script)

    document.body.prepend(container)
  }, [id])

  return <></>
}

export default AppArmorAlert
