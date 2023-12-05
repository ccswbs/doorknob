import React from "react"
import { graphql } from "gatsby"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { slugify } from "../../../utils/slugify.js"

const RequirementsPage = ({ data }) => {
  const getRequirementsURL = e => {
    e.preventDefault();
  }

  const [page, setPage] = "/";

  return (
    <Container className="content-block">
      <h1 className="fs-2 mt-5 mb-3">Admission Requirements</h1>
      <Row>
        <Col md={6}>
          <Form className="d-flex flex-column gap-5" method="GET" action={page}>
            <Button className="w-fit" type="submit">
              Get Requirements
            </Button>
          </Form>
        </Col>
        <Col md={4} className="ms-auto"></Col>
      </Row>
    </Container>
  )
}

export default RequirementsPage
