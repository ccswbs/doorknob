import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const render = ({ cards }) => {
  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {cards.map(({title, body, image}, index) => {
        return <div className="col" key={index}>
          <div className="card h-100 border-0 bg-info bg-opacity-10">
            <GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img-top" />
            <div className="card-body">
              <h3 className="card-title">{title}</h3>
              <p className="card-text">{body}</p>
            </div>
          </div>
        </div>
      })}
    </div>
  )
}

const query = graphql`
  query {
    blockYaml(yamlId: {eq: "home_cards"}) {
      id
      cards {
        title
        body
        image {
          src {
            childImageSharp {
              gatsbyImageData (
                width: 400
              )
            }
          }
          alt
        }
      }
    }
  }
`

export default function HomeCards () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}
