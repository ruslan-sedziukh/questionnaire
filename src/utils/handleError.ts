export const handleError = (userMessage: string, reportMessage: string) => {
  alert(userMessage)

  console.error(reportMessage)

  sendSentryReport(reportMessage)
}

const sendSentryReport = (reportMessage: string) => {
  // Provide report to sentry
}
