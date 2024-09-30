import { Container } from "react-bootstrap";
import React, { useState } from "react";
import * as styles from "../../../styles/blocks/home/homeNotification.module.css";
import { graphql, useStaticQuery } from "gatsby";

const query = graphql`
  query {
    blockYaml(yamlId: { eq: "home_notification" }) {
      title
      url
    }
  }
`;

export default function HomeNotification() {
  const { title, url } = useStaticQuery(query).blockYaml;
  const [dismissed, setDismissed] = useState(false);

  return (
    <>
      {!dismissed && (
        <div className={styles.container}>
          <a href={url} className={styles.link}>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <span className={styles.linkTitle}>{title}</span>
            <span>{url?.replace(/https?:\/\//, "")}</span>
          </a>

          <button
            className={styles.closeBtn}
            onClick={e => {
              setDismissed(true);
            }}
          >
            <i className={"fa-regular fa-circle-xmark"}></i>
            <span className="sr-only">Dismiss Notification</span>
          </button>
        </div>
      )}
    </>
  );
}
