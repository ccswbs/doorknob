import { graphql, useStaticQuery } from "gatsby"

export const useGraduatePrograms = () => {
  const data = useStaticQuery(graphql`
    query {
      blockYaml(yamlId: { eq: "graduate_programs" }) {
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
