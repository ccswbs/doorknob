import React, { useEffect, useRef, useState } from "react"
import { Form, FormGroup, Button } from "react-bootstrap"

const TextInput = ({ id, type = "text", name, label, required, helpText, onChange, placeholder, options }) => (
  <FormGroup controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Control
      type="text"
      name={name}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      list={Array.isArray(options) ? `${id}-datalist` : undefined}
    />

    {Array.isArray(options) && (
      <datalist id={`${id}-datalist`}>
        {options.map(option => (
          <option key={option} value={option}></option>
        ))}
      </datalist>
    )}

    {helpText && <Form.Text>{helpText}</Form.Text>}
  </FormGroup>
)

const SelectInput = ({ id, name, label, required, helpText, onChange, options }) => (
  <FormGroup controlId={id}>
    <Form.Label>{label}</Form.Label>
    <Form.Select name={name} required={required} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
    {helpText && <Form.Text>{helpText}</Form.Text>}
  </FormGroup>
)

const checkDependenciesAreMet = (toCheck, controls, formData) => {
  if (Array.isArray(toCheck.dependencies)) {
    for (const dependency of toCheck.dependencies) {
      const dependencyValue = formData?.get(dependency.name)
      if (dependency.values.includes(dependencyValue)) {
        // Recursively check dependencies of dependencies
        const parentDependencyControl = controls.find(control => control.name === dependency.name)
        if (!checkDependenciesAreMet(parentDependencyControl, controls, formData)) {
          return false
        }
      } else {
        return false
      }
    }
  }

  return true
}

const StyledForm = ({ onSubmit, controls, submitButtonText = "Submit" }) => {
  const ref = useRef(null)
  const [formData, setFormData] = useState(null)

  const updateFormData = () => {
    if (ref.current) {
      const data = new FormData(ref.current)
      setFormData(data)
    }
  }

  useEffect(() => {
    updateFormData()
  }, [controls])

  const handleSubmit = e => {
    e.preventDefault()
    updateFormData()
    console.log("submitting", formData)
    //onSubmit(formData);
  }

  return (
    <Form className="d-flex flex-column gap-5" onSubmit={handleSubmit} ref={ref}>
      {controls
        .map(control => {
          if (!checkDependenciesAreMet(control, controls, formData)) {
            return null
          }

          switch (control.type) {
            case "select":
              return <SelectInput key={control.name} onChange={updateFormData} {...control} />
            case "text":
              return <TextInput key={control.name} onChange={updateFormData} {...control} />
            default:
              return null
          }
        })
        .filter(Boolean)}

      <Button className="w-fit" type="submit">
        {submitButtonText}
      </Button>
    </Form>
  )
}

export default StyledForm
