import React from "react"
import classNames from "classnames"

const Statistic = {}

Statistic.Gradient = ({ stats, fullWidthBG = true }) => {
  const divisbleByTwo = stats.length % 2 === 0
  const divisbleByThree = stats.length % 3 === 0
  const divisbleByFour = stats.length % 4 === 0

  const colors = [
    {
      bg: "tw-bg-black",
      text: "tw-text-white",
    },
    {
      bg: "tw-bg-uofg-red",
      text: "tw-text-white",
    },
    {
      bg: "tw-bg-uofg-yellow",
      text: "tw-text-black",
    },
    {
      bg: "tw-bg-uofg-blue",
      text: "tw-text-black",
    },
  ]

  const dlClasses = classNames(
    "tw-flex",
    "tw-flex-wrap",
    "tw-flex-col",
    "sm:tw-flex-row",
    {
      "tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-4": divisbleByFour,
    },
    {
      "tw-grid tw-grid-cols-1 lg:tw-grid-cols-3": divisbleByThree && !divisbleByFour,
    },
    {
      "tw-grid tw-grid-cols-1 sm:tw-grid-cols-2": divisbleByTwo && !divisbleByFour,
    },
  )

  const statClasses = classNames(
    "tw-flex-1",
    "tw-flex",
    "tw-flex-col",
    "tw-justify-around",
    "tw-gap-5",
    "tw-p-12",
    "tw-relative",
    fullWidthBG
      ? classNames(
          'sm:before:tw-content-[""]',
          "before:tw-absolute",
          "before:tw-top-0",
          "before:tw-right-full",
          "before:tw-w-[calc(((100vw_-_theme(width.sm-container))_/_2))]",
          "md:before:tw-w-[calc(((100vw_-_theme(width.md-container))_/_2))]",
          "lg:before:tw-w-[calc(((100vw_-_theme(width.lg-container))_/_2))]",
          "xl:before:tw-w-[calc(((100vw_-_theme(width.xl-container))_/_2))]",
          "xxl:before:tw-w-[calc(((100vw_-_theme(width.xxl-container))_/_2))]",
          "before:tw-h-full",
          "before:tw-bg-inherit",
          "before:tw-z-[-1]",
          "first:before:tw-z-0",
          'sm:after:tw-content-[""]',
          "after:tw-absolute",
          "after:tw-top-0",
          "after:tw-left-full",
          "after:tw-w-[calc(((100vw_-_theme(width.sm-container))_/_2))]",
          "md:after:tw-w-[calc(((100vw_-_theme(width.md-container))_/_2))]",
          "lg:after:tw-w-[calc(((100vw_-_theme(width.lg-container))_/_2))]",
          "xl:after:tw-w-[calc(((100vw_-_theme(width.xl-container))_/_2))]",
          "xxl:after:tw-w-[calc(((100vw_-_theme(width.xxl-container))_/_2))]",
          "after:tw-h-full",
          "after:tw-bg-inherit",
          "after:tw-z-[-1]",
          "last:after:tw-z-0",
        )
      : "",
  )

  const dtClasses = classNames("tw-text-center", "tw-font-normal", "tw-text-4xl", "tw-leading-tight")

  const ddClasses = classNames("tw-text-center", "tw-font-normal", "tw-text-3xl")

  return (
    <dl className={dlClasses}>
      {stats.map((stat, index) => {
        const color = colors[index % colors.length]
        const type = stat.field_statistic_represents
        const value = stat.field_statistic_value
        const icon = stat.field_font_awesome_icon

        return (
          <div className={classNames(statClasses, color.bg, color.text)}>
            <dt className={dtClasses}>
              <span dangerouslySetInnerHTML={{ __html: value }}></span>
            </dt>
            <dd className={ddClasses}>
              <span dangerouslySetInnerHTML={{ __html: type }}></span>
            </dd>
          </div>
        )
      })}
    </dl>
  )
}

export default Statistic
