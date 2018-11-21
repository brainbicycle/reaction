import * as Sentry from "@sentry/browser"

export class NetworkError extends Error {
  response: any
}

export class ErrorWithMetadata extends Error {
  metadata: object
  decoratedMessage: string
  constructor(message, metadata = {}) {
    super(message)
    this.decoratedMessage = message + " | " + JSON.stringify(metadata)
    this.metadata = metadata
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const sendErrorToService = (error: Error | ErrorWithMetadata) => {
  Sentry.withScope(scope => {
    if (error instanceof ErrorWithMetadata) {
      Object.keys(error.metadata).forEach(key => {
        scope.setExtra(key, error.metadata[key])
      })
    }
    Sentry.captureException(error)
  })
}
