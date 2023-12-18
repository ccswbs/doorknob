import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import { navigate } from "gatsby"
import { requirementToSlug } from "../../../utils/requirementToSlug.js"

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
  const locations = data.locations.nodes
  const studentTypes = data.studentTypes.nodes
  const degreeTypes = data.degreeTypes.nodes
  const fieldsOfStudy = data.fieldsOfStudy.nodes
  const requirements = data.requirements.nodes
  const [values, setValues] = useState({})
  const [isFilled, setIsFilled] = useState(false)

  const doesRequirementExist = slug => {
    let start = 0,
      end = requirements.length - 1

    while (start <= end) {
      let mid = Math.floor((start + end) / 2)
      if (requirements[mid].fields.slug === slug) {
        return true
      } else if (requirements[mid].fields.slug < slug) {
        start = mid + 1
      } else {
        end = mid - 1
      }
    }

    return false
  }

  const getRequirementPageURL = slug => {
    let url = slug
    const tokens = slug.split("/")

    while (doesRequirementExist(url) === false && tokens.length > 0) {
      tokens.pop()
      url = tokens.join("/")
    }

    return url
  }

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
      const url = getRequirementPageURL(requirementToSlug(values))
      navigate(url)
    }
  }

  return (
    <Container className="content-block">
      <h1 className="my-5">Admission Requirements</h1>
      <Row>
        <Col md={6}>
          <Form className="d-flex flex-column gap-5" onChange={handleFormControlChange} onSubmit={handleFormSubmit}>
            <RequirementsPageSelect
              id="requirements-student-type"
              name="studentType"
              label="I am a(n):"
              required
              options={studentTypes}
            />

            <RequirementsPageSelect
              id="requirements-location"
              name="location"
              label="I live in:"
              required
              options={locations}
            />

            <RequirementsPageSelect
              id="requirements-degree-type"
              name="degreeType"
              label="I'm interested in:"
              required
              options={degreeTypes}
            />

            <RequirementsPageSelect
              id="requirements-field-of-study"
              name="fieldOfStudy"
              label="Choose your desired field:"
              options={fieldsOfStudy.filter(node => node.degreeType === values.degreeType)}
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
    locations: allAdmissionRequirementsLocationsYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    studentTypes: allAdmissionRequirementsStudentTypesYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    degreeTypes: allAdmissionRequirementsDegreeTypesYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    fieldsOfStudy: allAdmissionRequirementsFieldsOfStudyYaml {
      nodes {
        value: yamlId
        text: name
        degreeType: degree_type
      }
    }
    requirements: allAdmissionRequirementsYaml(sort: { fields: { slug: ASC } }) {
      nodes {
        fields {
          slug
        }
      }
    }
  }
`

export default RequirementsPage
