import React from "react"
import { LinkTabs } from "../../linkTabs"

export const ProgramTabs = () => {
  const tabs = [
    {
      href: "/undergraduate-programs/",
      content: "Undergraduate Programs",
    },
    {
      href: "/graduate-programs/",
      content: "Graduate Programs",
    },
  ]

  return <LinkTabs tabs={tabs} />
}
