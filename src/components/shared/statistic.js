import React from "react"
import styled from "styled-components"
import { Container } from "react-bootstrap"

const Gradient = styled.div`
  background: ${props => (props.gradientStyle ?? "none")};
  
  @media (min-width: 576px) and (max-width: 992px) {
    background: ${props => (props.stackedGradientStyle ?? "none")};
    && dl > div {
      
    }
    
  }
`
const gradientColourOptions = [
  {background: "var(--bs-black)", colour: "#FFFFFF"},
  {background: "var(--bs-red)", colour: "#FFFFFF"},
  {background: "var(--bs-yellow)", colour: "#000000"},
  {background: "var(--bs-blue)", colour: "#000000"},
  {background: "var(--bs-yellow)", colour: "#000000"},
  {background: "var(--bs-black)", colour: "#FFFFFF"},
  {background: "var(--bs-blue)", colour: "#000000"},
  {background: "var(--bs-red)", colour: "#FFFFFF"},
];

/* Accessible definition lists can only have one nested div.
In order to achieve gap between bordered stats, use grid instead of row-cols-* */
const StatisticGrid = styled.dl`
  display: grid;
  grid-template-columns: none;
  @media (min-width: 992px) {
    grid-template-columns: repeat(${props => (props.columns ?? "3")}, 1fr);
  }
`;
const StatCard = styled.div`
  background: #f5f7fa;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
  text-align: center;
`;
const StatBorderCard = styled(StatCard)`
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
  text-align: left;
`;
const StatSolidCard = styled(StatCard)`
  background: ${props => (props.background ?? "#000000")};
  color: ${props => (props.colour ?? "#ffffff")};
  && > dd a {
    color: ${props => (props.colour ?? "#ffffff")} !important;
  }
  & > dt {
    color: ${props => (props.colour ?? "#ffffff")};
  }
`;
const StatValue = styled.dt`
  color: #000;
  font-size: ${props => (props.fontsize ?? "3.25rem")};
  line-height: 1.2;
  margin-bottom: 1.2rem;
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
`;
const StatIcon = styled.i`
  color: ${props => (props.colour ?? "#000")};
`;

const Statistic = ({id, children, className=""}) => (
  <dl id={id} className={`${className}`}>
      {children}
  </dl>
)

Statistic.Grid = ({id, children, columns, className=""}) => (
  <StatisticGrid id={id} columns={columns} className={`${className}`}>
      {children}
  </StatisticGrid>
)

Statistic.Card = ({children}) => (
  <StatCard className="h-100">
    {children}
  </StatCard>
)

Statistic.BorderCard = ({border, children, className=""}) => (
  <StatBorderCard border={border} className={`${className} h-100`}>
    {children}
  </StatBorderCard>
)

Statistic.SolidCard = ({background, colour, children, className=""}) => (
    <StatSolidCard background={background} colour={colour} className={`${className} align-self-stretch`}>
      {children}
    </StatSolidCard>
)

Statistic.Icon = ({icon, colour}) => (
  <StatIcon colour={colour} className={`${icon} mt-3 fa-4x`} aria-hidden="true" />
)

Statistic.Value = ({children, fontsize, className=""}) => (
  <StatValue className={className} fontsize={fontsize}>
    {children}
  </StatValue>
)

Statistic.Type = ({children, className=""}) => (
  <StatType className={className}>
    {children}
  </StatType>
)

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
Statistic.Gradient = ({stats}) => {
  let numStats = stats.length;

  // default is displaying 3 colours in a row
  let rowClasses = "row-cols-md-3";
  let gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#ffc72a 60%,#ffc72a 100%)";
  let stackedGradientStyle = "repeating-conic-gradient(var(--bs-red) 0% 25%, var(--bs-blue) 0% 50%, var(--bs-yellow) 50% 75%, var(--bs-black) 75% 100%)";


  if (numStats === 1){
    // one colour
    rowClasses = "row-cols-sm-1";
    gradientStyle = "#000000";
  } else if (numStats === 2) {
    // two colours
    rowClasses = "row-cols-sm-2";
    gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#c20430 60%,#c20430 100%)";
  } else if (numStats % 4 === 0) {
    // four colour
    rowClasses = "row-cols-sm-2 row-cols-lg-4";
    gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%)";
  }

  return (
    <Gradient className="row d-flex flex-column w-100 mx-auto" 
              gradientStyle={gradientStyle} 
              stackedGradientStyle={stackedGradientStyle} >
      <div className="p-0">
        <Container className="px-0"> 
          <Statistic className={`row g-0 row-cols-1 ${rowClasses} justify-content-center mb-0`}>
              {stats.map((stat, index) => {
                let type = stat.field_statistic_represents;
                let value = stat.field_statistic_value;
                let icon = stat.field_font_awesome_icon;

                return <Statistic.SolidCard 
                      key={`gradient-stat-${index}`} 
                      background={gradientColourOptions[index%gradientColourOptions.length].background} 
                      colour={gradientColourOptions[index%gradientColourOptions.length].colour} 
                      className="p-5 col">
                        {icon && <Statistic.Icon icon={icon} colour={gradientColourOptions[index%gradientColourOptions.length].colour} />}
                        <Statistic.Value><strong>{value}</strong></Statistic.Value>
                        <Statistic.Type><span dangerouslySetInnerHTML={{__html: type}} /></Statistic.Type>
                    </Statistic.SolidCard>
                }
              )}
          </Statistic>
        </Container>
      </div>                
    </Gradient>
)}


export default Statistic