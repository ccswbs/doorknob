import { graphql, useStaticQuery } from "gatsby"

export const useUndergraduatePrograms = () => {
  const data = useStaticQuery(graphql`
    query {
      blockYaml(yamlId: { eq: "undergraduate_programs" }) {
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

  return data.blockYaml.programs
}
