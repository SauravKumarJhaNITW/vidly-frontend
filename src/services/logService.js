import Raven from "raven-js";

export function init() {
  Raven.config(
    "https://6b75613687d94cbb9b6e81cc6bbf6854@o914975.ingest.sentry.io/5854642",
    {
      release: "1-0-0",
      environment: "developement-test",
    }
  ).install();
}

export function log(error) {
  Raven.captureException(error);
}
