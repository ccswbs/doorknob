import * as React from "react"
import Seo from "../components/seo"
import "../styles/404.css"

const NotFoundPage = () => (
  <div className="container p-4">
    <h1>HTTP 404 — File not found</h1>
    <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
    <p>We think you will find one of the following links useful:</p>
    <p>
      <a href="https://www.uoguelph.ca/">University of Guelph Home Page</a>
    </p>
    <p>
      <a href="https://www.uoguelph.ca/sitemap">University of Guelph Site Map</a>
    </p>
    <p>
      <strong>You may not be able to find this page because of:</strong>
    </p>
    <ol type="a">
      <li>
        An <strong>out-of-date bookmark/favourite</strong>
      </li>
      <li>
        A search engine that has an <strong>out-of-date listing for us</strong>
      </li>
      <li>
        A <strong>mis-typed address</strong>
      </li>
      <li>
        If you are <strong>looking for an out-of-date page</strong> that might have been removed from this site, you can
        search for <a href="http://web.archive.org/web/*/https://www.uoguelph.ca/232">an archival copy</a> at the&nbsp;
        <a href="http://www.archive.org">Internet Archive</a>. The University of Guelph is not responsible for the
        contents of the Internet Archive.
      </li>
    </ol>
    <p>
      Please visit the University of Guelph homepage at <a href="http://www.uoguelph.ca/">www.uoguelph.ca</a> or contact
      the website manager at <a href="mailto:webmaster@uoguelph.ca">webmaster@uoguelph.ca</a>.
    </p>
  </div>
)

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
