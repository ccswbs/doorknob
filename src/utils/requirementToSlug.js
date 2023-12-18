module.exports = {
  requirementToSlug: ({ studentType, location, degreeType, fieldOfStudy }) =>
    `undergraduate/${studentType}/${location}/${degreeType}/${fieldOfStudy}`
      .replace(/null|undefined/g, "")
      .replace(/\/+/g, "/")
      .replace(/\/$/, ""),
}
