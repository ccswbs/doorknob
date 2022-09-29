
# Introduction
This repository contains the source code for the University of Guelph homepage (https://www.uoguelph.ca).

## 🚀 Quick start

1. Install NPM
1. Install Git
1. Install the Gatsby CLI
1. Clone this repository
1. Run NPM clean install:
   ```shell
   npm ci
   ```
1. Start the Gatsby development server:
   ```shell
   cd doorknob
   gatsby develop
   ```

# Build and Test

1. Build the site
   ```shell
   npm run build
   ```
1. Start the Gatsby server:
   ```shell
   gatsby serve
   ```

## 🧐 What's inside?

Most of the landing pages are implemented as Gatsby pages (in the
`src/pages` directory.) Pages that require dynamic queries have (such as
the index or news page) have templates (under `src/templates`.) Pages and
templates define the page layout. Content is defined by components under
`src/components`.

```
.
|-- LICENSE
|-- README.md
|-- gatsby-config.js
|-- gatsby-node.js
|-- src
|   |-- components         Components.
|   |-- images             Image data.
|   |-- pages              Page definitions.
|   |-- templates          Template definitions.
`-- static
```

## Front-end Framework

This repository uses [Snowdrop](https://github.com/ccswbs/snowdrop), a University of Guelph themed front-end framework based on Bootstrap.

