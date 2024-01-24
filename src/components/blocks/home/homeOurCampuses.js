import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getImage, GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_our_campuses" }) {
      links {
        title
        url
        image {
          alt
          src {
            childImageSharp {
              gatsbyImageData(width: 440)
            }
          }
        }
      }
    }
  }
`;

export const HomeOurCampuses = () => {
  const links = useStaticQuery(query).blockYaml.links;
  const rowClasses = classNames("row", "row-cols-1", "g-4", "row-cols-md-3");
  const cardClasses = classNames("h-100", "border-0", "bg-info", "bg-opacity-10");

  return (
    <Container className="content-block position-relative">
      <h2 className="mt-5 mb-5">Our Three Campuses</h2>
      <Row className={rowClasses}>
        {links.map(link => (
          <Col key={link.title}>
            <Card className={cardClasses}>
              <GatsbyImage image={getImage(link.image.src)} alt={link.image.alt} className="card-img-top" />
              <Card.Body className="d-flex justify-content-center align-items-center">
                <Card.Title
                  as="a"
                  href={link.url}
                  className="h5 link-dark stretched-link text-decoration-none fw-bold text-center"
                >
                  {link.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeOurCampuses;
