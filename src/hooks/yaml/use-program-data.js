import { graphql, useStaticQuery } from "gatsby"

export const useProgramData = () => {
  const data = useStaticQuery(graphql`
    query {
      blockYaml(yamlId: { eq: "programs" }) {
        programs {
          title
          url
          degree {
            title
            type
          }
          tags
        }
      }
    }
  `)

  return data.blockYaml.programs
}
