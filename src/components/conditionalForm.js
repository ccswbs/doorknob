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

const RadioInput = ({ id, name, label, required, helpText, onChange, options }) => (
  <FormGroup controlId={id}>
    <Form.Label>{label}</Form.Label>
    {options.map((option, index) => {
      const checkboxID = `${id}-${option.value}`
      return (
        <FormGroup controlId={checkboxID} key={checkboxID}>
          <Form.Check
            key={index}
            type="radio"
            name={name}
            label={option.label}
            value={option.value}
            onChange={onChange}
            required={required}
            defaultChecked={option.default}
          />
        </FormGroup>
      )
    })}
    {helpText && <Form.Text>{helpText}</Form.Text>}
  </FormGroup>
)

const CheckboxInput = ({ id, name, label, required, helpText, onChange, defaultChecked }) => (
  <FormGroup controlId={id}>
    <Form.Check
      type="checkbox"
      name={name}
      label={label}
      required={required}
      onChange={onChange}
      defaultChecked={defaultChecked}
    />
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

const ConditionalForm = ({ action, method, onSubmit, controls, submitButtonText = "Submit" }) => {
  const ref = useRef(null)
  const [formData, setFormData] = useState(null)

  const updateFormData = () => {
    // Form hasn't been rendered yet, don't do anything
    if (!ref.current) return

    // Create form data object
    const data = new FormData(ref.current)

    // Check if form data has changed
    let stale = false

    const oldData = Array.from(formData?.entries() || [])
    const newData = Array.from(data.entries())

    if (oldData.length !== newData.length) {
      stale = true
    } else {
      for (let [key, value] of newData) {
        if (formData?.get(key) !== value) {
          stale = true
          break
        }
      }
    }

    // Only update form data if it has changed
    if (stale) {
      setFormData(data)
    }
  }

  // After every render, we need to ensure that the form data is up to date.
  useEffect(() => {
    updateFormData()
  })

  return (
    <Form
      action={action}
      method={method}
      className="d-flex flex-column gap-5"
      onSubmit={e => {
        e.preventDefault()
        updateFormData()

        if (typeof onSubmit === "function") {
          onSubmit(e, formData)
        }
      }}
      ref={ref}
    >
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
            case "radio":
              return <RadioInput key={control.name} onChange={updateFormData} {...control} />
            case "checkbox":
              return <CheckboxInput key={control.name} onChange={updateFormData} {...control} />
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

export default ConditionalForm
