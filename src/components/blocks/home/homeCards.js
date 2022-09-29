import React from "react"
import { StaticQuery, graphql } from "gatsby"

const render = ({ cards }) => {
  return (
    <div class="row row-cols-1 row-cols-md-4 g-4">
      {cards.map(({title, body}, index) => {
        return <div class="col">
          <div class="card h-100">
            {/* <img src="..." class="card-img-top" alt="..."> */}
            <div class="card-body">
              <h3 class="card-title">{title}</h3>
              <p class="card-text">{body}</p>
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
        title
        cards {
          title
          body
        }
    }
  }
`

export default function HomeCards () {
  return <StaticQuery query={query} render={({blockYaml}) => render(blockYaml )} />
}