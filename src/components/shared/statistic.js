import React from "react"
import styled from "styled-components"
import classNames from "classnames"

/* Accessible definition lists can only have one nested div.
In order to achieve gap between bordered stats, use grid instead of row-cols-* */
const StatisticGrid = styled.dl`
  display: grid;
  grid-template-columns: none;
  @media (min-width: 992px) {
    grid-template-columns: repeat(${props => props.columns ?? "3"}, 1fr);
  }
`
const StatCard = styled.div`
  background: #f5f7fa;
  padding: 3rem;
  min-width: 25%;
  word-wrap: break-word;
  text-align: center;

  @media (min-width: 992px) and (max-width: 1415px), (min-width: 576px) and (max-width: 768px) {
    padding: 2rem;
  }
`
const StatBorderCard = styled(StatCard)`
  border-left: 1rem solid ${props => props.border ?? "#000000"};
  text-align: left;
`
const StatSolidCard = styled(StatCard)`
  background: ${props => props.background ?? "#000000"};
  color: ${props => props.colour ?? "#ffffff"};
  && > dd a {
    color: ${props => props.colour ?? "#ffffff"} !important;
  }
  & > dt {
    color: ${props => props.colour ?? "#ffffff"};
  }
`
const StatValue = styled.dt`
  color: #000;
  font-size: ${props => props.fontsize ?? "3rem"};
  line-height: 1.2;
  margin-bottom: 1.2rem;

  @media (min-width: 992px) and (max-width: 1415px), (min-width: 576px) and (max-width: 768px) {
    font-size: 2.6rem;
  }
`
const StatType = styled.dd`
  font-size: 1.8rem;
  line-height: 1.58;
  & > a {
    color: #0068ad !important;
  }

  & > a:hover,
  & > a:focus {
    color: #ffffff !important;
  }
`
const StatIcon = styled.i`
  color: ${props => props.colour ?? "#000"};
`

const Statistic = ({ id, children, className = "" }) => (
  <dl id={id} className={`${className}`}>
    {children}
  </dl>
)

Statistic.Grid = ({ id, children, columns, className = "" }) => (
  <StatisticGrid id={id} columns={columns} className={`${className}`}>
    {children}
  </StatisticGrid>
)

Statistic.Card = ({ children }) => <StatCard className="h-100">{children}</StatCard>

Statistic.BorderCard = ({ border, children, className = "" }) => (
  <StatBorderCard border={border} className={`${className} h-100`}>
    {children}
  </StatBorderCard>
)

Statistic.SolidCard = ({ background, colour, children, className = "" }) => (
  <StatSolidCard background={background} colour={colour} className={`${className} align-self-stretch`}>
    {children}
  </StatSolidCard>
)

Statistic.Icon = ({ icon, colour }) => <StatIcon colour={colour} className={`${icon} mt-3 fa-4x`} aria-hidden="true" />

Statistic.Value = ({ children, fontsize, className = "" }) => (
  <StatValue className={className} fontsize={fontsize}>
    {children}
  </StatValue>
)

Statistic.Type = ({ children, className = "" }) => <StatType className={className}>{children}</StatType>

/***
 *
 *  stats: Array of Objects containing:
 *    {
 *      id (Number)
 *      field_statistic_represents (String)
 *      field_statistic_value (String)
 *      field_font_awesome_icon (String)
 *    }
 */
Statistic.Gradient = ({ stats, fullWidthBG = true }) => {
  const divisbleByTwo = stats.length % 2 === 0
  const divisbleByThree = stats.length % 3 === 0
  const divisbleByFour = stats.length % 4 === 0

  const colorClasses = [
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
    "tw-container",
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
          "after:tw-w-[calc(((100vw_-_theme(width.sm-container)_-_var(--tw-scrollbar-width))_/_2))]",
          "md:after:tw-w-[calc(((100vw_-_theme(width.md-container)_-_var(--tw-scrollbar-width))_/_2))]",
          "lg:after:tw-w-[calc(((100vw_-_theme(width.lg-container)_-_var(--tw-scrollbar-width))_/_2))]",
          "xl:after:tw-w-[calc(((100vw_-_theme(width.xl-container)_-_var(--tw-scrollbar-width))_/_2))]",
          "xxl:after:tw-w-[calc(((100vw_-_theme(width.xxl-container)_-_var(--tw-scrollbar-width))_/_2))]",
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
        const color = colorClasses[index % colorClasses.length]
        const type = stat.field_statistic_represents
        const value = stat.field_statistic_value
        const icon = stat.field_font_awesome_icon

        return (
          <div key={value + type} className={classNames(statClasses, color.bg, color.text)}>
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
