import React, { useEffect } from "react"

const AppArmorAlert = ({ id }) => {
  useEffect(() => {
    const appArmorID = "AppArmorAlertID_" + id

    // Remove any existing AppArmorAlerts with the same ID to prevent duplicates
    document.querySelectorAll("#" + appArmorID).forEach(e => e.remove())

    const container = document.createElement("div")
    container.id = appArmorID
    document.body.prepend(container)

    // Need to load the script after the container is added to the DOM, otherwise the app armor script will not find the container
    const script = document.createElement("script")
    script.src = "https://uoguelph.apparmor.com/Notifications/Feeds/Javascript/?AlertID=" + id
    container.appendChild(script)
  }, [id])

  return <></>
}

export default AppArmorAlert
