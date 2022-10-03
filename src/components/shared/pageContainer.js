import React from "react"

const PageContainer = ({ children, className}) => (
  <div className={`container page-container ${className ?? '' }`}>
    {children}
  </div>
)

PageContainer.ContentArea = ({ children, className}) => (
  <div className={`content-area ${className ?? '' }`}>
    {children}
  </div>
)

PageContainer.FullWidth = ({ children, className}) => (
  <div className={`full-width-container ${className ?? '' }`}>
    {children}
  </div>
)

PageContainer.Margins = ({ children, className}) => (
  <PageContainer.SiteContent>
    <PageContainer.ContentArea>
      {children}
    </PageContainer.ContentArea>
  </PageContainer.SiteContent>
)

PageContainer.SiteContent = ({ children, className}) => (
  <PageContainer>
    <div className={`row site-content ${className ?? '' }`}>
      {children}
    </div>
  </PageContainer>
)

export default PageContainer
