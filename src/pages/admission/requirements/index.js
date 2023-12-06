import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { toTitleCase } from "../../../utils/to-title-case.js"

const RequirementsPage = ({ data }) => {
  const getRequirementsURL = e => {
    e.preventDefault()
  }

  const query = useStaticQuery(graphql`
    query {
      undergraduate: allSitePage(filter: { path: { regex: "/^/admission/requirements/undergraduate/.+/" } }) {
        nodes {
          path
        }
      }
    }
  `)

  const provinces = new Set()
  const studentTypes = new Set()
  const programs = new Set()

  query.undergraduate.nodes.forEach(value => {
    const tokens = value.path.split("/")

    provinces.add(tokens[4])
    studentTypes.add(tokens[5])
    programs.add(tokens[6])
  })

  useEffect(() => {
    console.log(provinces)
  }, [])

  const [page, setPage] = useState("")
  const [filled, setFilled] = useState(false)

  return (
    <Container className="content-block">
      <h1 className="fs-2 mt-5 mb-3">Admission Requirements</h1>
      <Row>
        <Col md={6}>
          <Form className="d-flex flex-column gap-5" method="GET" action={page}>
            <Form.Group controlId="admission-requirements-provinces">
              <Form.Label>I live in:</Form.Label>
              <Form.Select name="province" required>
                {Array.from(provinces).map(value => (
                  <option key={value} value={value}>
                    {toTitleCase(value.replaceAll("-", " "))}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="admission-requirements-student-type">
              <Form.Label>I am a(n):</Form.Label>
              <Form.Select name="student-type" required>
                {Array.from(studentTypes).map(value => (
                  <option key={value} value={value}>
                    {toTitleCase(value.replaceAll("-", " "))}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="admission-requirements-degree-type">
              <Form.Label>I am interested in:</Form.Label>
              <Form.Select name="degree-type" required></Form.Select>
            </Form.Group>

            <Form.Group controlId="admission-requirements-program">
              <Form.Label>Choose your desired field:</Form.Label>
              <Form.Select name="program-type" required>
                {Array.from(programs).map(value => (
                  <option key={value} value={value}>
                    {toTitleCase(value.replaceAll("-", " "))}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button
              variant={filled ? "outline-primary" : "outline-secondary"}
              className="w-fit px-5 py-3"
              type="submit"
            >
              View Requirements
            </Button>
          </Form>
        </Col>
        <Col md={4} className="ms-auto"></Col>
      </Row>
    </Container>
  )
}

export default RequirementsPage
