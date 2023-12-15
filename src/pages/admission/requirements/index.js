import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { SlugTree } from "../../../utils/slug-tree.js"
import { navigate } from "gatsby"

const RequirementsPageSelect = ({ id, name, label, options, required, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Select onChange={onChange} name={name} required={required} defaultValue="null">
        <option disabled value="null">
          Please select an option
        </option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

const RequirementsPage = ({ data }) => {
  const getRequirementsURL = e => {
    e.preventDefault()
  }

  const requirements = new SlugTree()

  data.requirements.nodes.forEach(val => {
    requirements.addSlugs({ slug: val.slug, name: val.name })
  })

  const [values, setValues] = useState({})
  const [isFilled, setIsFilled] = useState(false)

  const handleFormControlChange = e => {
    setValues(old => ({ ...old, [e.target.name]: e.target.value }))

    setIsFilled(
      Array.from(e.currentTarget.querySelectorAll("select")).every(
        select => typeof select.value === "string" && select.value !== "null",
      ),
    )
  }

  const handleFormSubmit = e => {
    e.preventDefault()

    if (isFilled) {
      navigate(
        `undergraduate/${values.location}/${values.studentType}/${values.degreeType}/${values.fieldOfStudy}`,
      )?.catch(e => console.error(e))
    }
  }

  const getOptions = (...parts) => {
    const node = requirements.getNode(...parts)

    console.log(node)

    return node?.children.map(node => ({ value: node.part, text: node.name })) ?? []
  }

  return (
    <Container className="content-block">
      <h1 className="fs-2 mt-5 mb-3">Admission Requirements</h1>
      <Row>
        <Col md={6}>
          <Form className="d-flex flex-column gap-5" onChange={handleFormControlChange} onSubmit={handleFormSubmit}>
            <RequirementsPageSelect
              id="requirements-location"
              name="location"
              label="I live in:"
              required
              options={getOptions("undergraduate")}
            />

            <RequirementsPageSelect
              id="requirements-student-type"
              name="studentType"
              label="I am a(n):"
              required
              options={getOptions("undergraduate", values.location)}
            />

            <RequirementsPageSelect
              id="requirements-degree-type"
              name="degreeType"
              label="I'm interested in:"
              required
              options={getOptions("undergraduate", values.location, values.studentType)}
            />

            <RequirementsPageSelect
              id="requirements-field-of-study"
              name="fieldOfStudy"
              label="Choose your desired field:"
              options={getOptions("undergraduate", values.location, values.studentType, values.degreeType)}
            />

            <Button
              variant={isFilled ? "outline-primary" : "outline-secondary"}
              className="w-fit px-5 py-3"
              type="submit"
              disabled={!isFilled}
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

export const query = graphql`
  query {
    requirements: allAdmissionRequirementsYaml {
      nodes {
        slug
        name
      }
    }
    pages: allSitePage(filter: { path: { regex: "/^/admission/requirements(/[^/]+)+/$/" } }) {
      nodes {
        path
      }
    }
  }
`

export default RequirementsPage
