import React from "react"
import { graphql } from "gatsby"
import StyledForm from "../../components/styledForm.js"
import { Col, Container, Row } from "react-bootstrap"

const UndergraduateRequirementsPage = ({ data }) => {
  const controls = [
    {
      id: "requirements-student-type",
      name: "student-type",
      label: "I am a...",
      type: "select",
      required: true,
      options: [
        { value: "high-school", label: "High School Student/Graduate" },
        { value: "transfer", label: "Transfer Student from a University/College" },
        { value: "mature", label: "Mature Student (Out of High School for more than 2 years)" },
      ],
    },
    {
      id: "requirements-high-school-location",
      name: "high-school-location",
      label: "I attend/attended high school in...",
      type: "select",
      required: true,
      dependencies: [
        {
          name: "student-type",
          values: ["high-school"],
        },
      ],
      options: [
        { value: "ontario", label: "Ontario" },
        { value: "alberta", label: "Alberta" },
        { value: "british-columbia", label: "British Columbia" },
        { value: "manitoba", label: "Manitoba" },
        { value: "new-brunswick", label: "New Brunswick" },
        { value: "newfoundland-and-labrador", label: "Newfoundland and Labrador" },
        { value: "northwest-territories", label: "Northwest Territories" },
        { value: "nova-scotia", label: "Nova Scotia" },
        { value: "nunavut", label: "Nunavut" },
        { value: "prince-edward-island", label: "Prince Edward Island" },
        { value: "quebec", label: "Quebec" },
        { value: "saskatchewan", label: "Saskatchewan" },
        { value: "yukon", label: "Yukon" },
        { value: "outside-canada", label: "Outside of Canada" },
        { value: "home-school", label: "Home School" },
      ],
    },
    {
      id: "requirements-high-school-country",
      name: "high-school-country",
      label: "My country is...",
      dependencies: [
        {
          name: "high-school-location",
          values: ["outside-canada"],
        },
      ],
      type: "text",
      options: ["Afghanistan", "Albania"],
      required: true,
    },
    {
      id: "requirements-interested-major",
      name: "interested-major",
      label: "I am interested in studying...",
      dependencies: [
        {
          name: "student-type",
          values: ["high-school"],
        },
      ],
      type: "text",
      options: ["Computer Science", "Software Engineering", "Computer Engineering", "Electrical Engineering"],
      required: true,
    },
  ]

  return (
    <Container>
      <h1 className="fs-2 mt-5 mb-3">Undergraduate Requirements</h1>
      <Row>
        <Col md={6}>
          <StyledForm controls={controls} submitButtonText="View Requirements" />
        </Col>
      </Row>
    </Container>
  )
}

export default UndergraduateRequirementsPage
