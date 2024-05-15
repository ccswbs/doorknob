import React, { useEffect, useState } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Requirement } from "../../../utils/requirement.js";

const RequirementsPageSelect = ({ id, name, label, options, required, onChange }) => {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Select onChange={onChange} name={name} required={required} defaultValue="null">
        <option disabled={options.length !== 0} value="null">
          Please select an option
        </option>

        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

const RequirementsPage = ({ data }) => {
  const locations = data.locations.nodes;
  const student_types = data.student_types.nodes;
  const degree_types = data.degree_types.nodes;
  const fields_of_study = data.fields_of_study.nodes;
  const requirements = data.requirements.nodes?.map(req => new Requirement(req));
  const [values, setValues] = useState({});
  const [isFilled, setIsFilled] = useState(false);

  const handleFormControlChange = e => {
    setValues(old => ({ ...old, [e.target.name]: e.target.value }));

    setIsFilled(
      Array.from(e.currentTarget.querySelectorAll("select")).every(
        select => typeof select.value === "string" && select.value !== "null",
      ),
    );
  };

  const handleFormSubmit = e => {
    e.preventDefault();

    if (!isFilled) {
      return;
    }

    const requirement = new Requirement(values);
    const closest = Requirement.findClosest(requirement, requirements);

    if (closest) {
      navigate(`/admission/requirements/${closest.slug}`);
    }
  };

  return (
    <Container className="content-block">
      <h1 className="my-5">Admission Requirements</h1>
      <Row>
        <Col md={8}>
          <Form className="d-flex flex-column gap-5" onChange={handleFormControlChange} onSubmit={handleFormSubmit}>
            <RequirementsPageSelect
              id="requirements-location"
              name="location"
              label="I live in:"
              required
              options={locations}
            />

            <RequirementsPageSelect
              id="requirements-student-type"
              name="student_type"
              label="I am a(n):"
              required
              options={student_types}
            />

            <RequirementsPageSelect
              id="requirements-degree-type"
              name="degree_type"
              label="I'm interested in:"
              required
              options={degree_types}
            />

            <RequirementsPageSelect
              id="requirements-field-of-study"
              name="field_of_study"
              label="Choose your desired field:"
              options={fields_of_study.filter(node => node.degree_type === values.degree_type)}
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
  );
};

export const query = graphql`
  query {
    locations: allAdmissionRequirementsLocationsYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    student_types: allAdmissionRequirementsStudentTypesYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    degree_types: allAdmissionRequirementsDegreeTypesYaml {
      nodes {
        value: yamlId
        text: name
      }
    }
    fields_of_study: allAdmissionRequirementsFieldsOfStudyYaml {
      nodes {
        value: yamlId
        text: name
        degree_type
      }
    }
    requirements: allAdmissionRequirementsYaml {
      nodes {
        student_type
        location
        degree_type
        field_of_study
      }
    }
  }
`;

export default RequirementsPage;
