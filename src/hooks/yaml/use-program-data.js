import { graphql, useStaticQuery } from "gatsby"

export const useProgramData = () => {
  const data = useStaticQuery(graphql`
    query {
      blockYaml(yamlId: { eq: "programs" }) {
        programs {
          id
          title
          acronym
          url
          types
          degrees
          tags
        }
      }
    }
  `)

  return data.blockYaml.programs.sort((a, b) => a.title.localeCompare(b.title))
}
