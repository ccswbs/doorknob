import React from "react"
import { graphql } from "gatsby"
import ConditionalForm from "../../../components/conditionalForm.js"
import { Col, Container, Row } from "react-bootstrap"
import { slugify } from "../../../utils/slugify.js"

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
        { value: "international", label: "Outside of Canada" },
        { value: "home-school", label: "Home School" },
      ],
    },
    {
      id: "requirements-high-school-country-curriculum",
      name: "high-school-country-curriculum",
      label: "My country/curriculum is...",
      dependencies: [
        {
          name: "high-school-location",
          values: ["international"],
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
    {
      id: "requirements-transfer-type",
      name: "transfer-type",
      label: "I am transferring from...",
      dependencies: [
        {
          name: "student-type",
          values: ["transfer"],
        },
      ],
      type: "select",
      options: [
        { value: "internal", label: "University of Guelph (Internal Transfer or Readmission)" },
        { value: "external", label: "Another University/College in Canada" },
        { value: "international", label: "Another University/College outside of Canada" },
      ],
    },
    {
      id: "requirements-post-degree",
      name: "post-degree",
      label: "I have already completed a post-secondary degree.",
      dependencies: [
        {
          name: "transfer-type",
          values: ["external", "international"],
        },
      ],
      type: "checkbox",
    },
  ]

  const getRequirementsURL = (e, data) => {
    let url = "/admission/undergraduate-requirements/"

    url += data.get("student-type")

    switch (data.get("student-type")) {
      case "high-school":
        url += `/${data.get("high-school-location")}`

        if (data.get("high-school-location") === "international") {
          url += `/${slugify(data.get("high-school-country-curriculum"))}`
        } else if (data.get("high-school-ap-ib") !== "none") {
          url += `/${data.get("high-school-ap-ib")}`
        }

        if (data.get("interested-major")) {
          url += `/${slugify(data.get("interested-major"))}`
        }
        break
      case "transfer":
        url += `/${data.get("transfer-type")}`

        switch (data.get("transfer-type")) {
          case "external":
          case "international":
            if (data.get("post-degree")) {
              url += "/post-degree"
            }
            break
        }
        break
      default:
        break
    }

    console.log(url)
  }

  return (
    <Container className="content-block">
      <h1 className="fs-2 mt-5 mb-3">Undergraduate Admission Requirements</h1>
      <Row>
        <Col md={6}>
          <ConditionalForm controls={controls} submitButtonText="View Requirements" onSubmit={getRequirementsURL} />
        </Col>
        <Col md={4} className="ms-auto"></Col>
      </Row>
    </Container>
  )
}

export default UndergraduateRequirementsPage
