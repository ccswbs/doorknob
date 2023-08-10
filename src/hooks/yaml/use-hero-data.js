import { useStaticQuery, graphql } from "gatsby";

export const useHeroData = () => {
  let heroData = [];
  
  const data = useStaticQuery(
	graphql`
	  query {
		blockYaml(yamlId: { eq: "home_hero" }) {
		  title
		  body
		  alignment
		  link {
			url
			text
		  }
		  image {
			src {
			  childImageSharp {
				gatsbyImageData(width: 1680, height: 640)
			  }
			}
			alt
		  }
		}
	  }
	`
  )
  heroData.push({
    imageSrc: data.blockYaml.image.src,
    imageAlt: data.blockYaml.image.alt,
    buttonText: data.blockYaml.link.text,
    captionAlign: data.blockYaml.alignment,
    captionText: data.blockYaml.body,
    title: data.blockYaml.title,
    url: data.blockYaml.link.url
  });
  
  return heroData;
}