// hierarchy goes from most specific to the least specific
const hierarchy = ["field_of_study", "degree_type", "location", "student_type"];

class Requirement {
  constructor({ student_type, location, degree_type, field_of_study }) {
    this.student_type = student_type;
    this.location = location;
    this.degree_type = degree_type;
    this.field_of_study = field_of_study;
  }
  get slug() {
    let slug = "undergraduate";

    for (let i = hierarchy.length - 1; i >= 0; i--) {
      const attribute = hierarchy[i];

      if (this[attribute]) {
        slug += `/${this[attribute]?.replaceAll("_", "-")}`;
      }
    }

    return slug;
  }
  get parents() {
    if (Array.isArray(this._parents)) {
      return this._parents;
    }

    this._parents = [];

    for (let i = 0; i < hierarchy.length; i++) {
      const attribute = hierarchy[i];
      const parent = Requirement.clone(this);

      if (this[attribute]) {
        for (let j = i; j >= 0; j--) {
          const removedAttribute = hierarchy[j];
          parent[removedAttribute] = null;
        }

        this.parents.push(parent);
      }
    }

    return this._parents;
  }
  static clone(requirement) {
    return new Requirement({
      student_type: requirement.student_type,
      location: requirement.location,
      degree_type: requirement.degree_type,
      field_of_study: requirement.field_of_study,
    });
  }
  static equal(r1, r2) {
    return (
      r1.student_type === r2.student_type &&
      r1.location === r2.location &&
      r1.degree_type === r2.degree_type &&
      r1.field_of_study === r2.field_of_study
    );
  }
  static distance(from, to) {
    if (!(from instanceof Requirement)) {
      throw new TypeError("from must be a Requirement object");
    }

    if (!(to instanceof Requirement)) {
      throw new TypeError("to must be a Requirement object");
    }

    if (Requirement.equal(from, to)) {
      return 0;
    }

    for (let i = 0; i < to.parents.length; i++) {
      const parent = to.parents[i];

      if (Requirement.equal(from, parent)) {
        return i;
      }
    }

    return Infinity;
  }
  static findClosest(needle, haystack) {
    let closest = null;
    let closestDistance = Infinity;

    for (const requirement of haystack) {
      const distance = Requirement.distance(requirement, needle);

      if (distance < closestDistance) {
        closest = requirement;
        closestDistance = distance;
      }
    }

    return closest;
  }
}

module.exports = {
  Requirement,
  requirementToSlug: requirement => {
    let slug = "undergraduate";

    for (let i = hierarchy.length - 1; i >= 0; i--) {
      const attribute = hierarchy[i];

      if (requirement[attribute]) {
        slug += `/${requirement[attribute]?.replaceAll("_", "-")}`;
      }
    }

    return slug;
  },

  getParentRequirements: requirement => {
    const parents = [];

    for (let i = 0; i < hierarchy.length; i++) {
      const attribute = hierarchy[i];
      const parent = { ...requirement };

      if (requirement[attribute]) {
        for (let j = i; j >= 0; j--) {
          const removedAttribute = hierarchy[j];
          parent[removedAttribute] = null;
        }

        parents.push(parent);
      }
    }

    return parents;
  },
};
