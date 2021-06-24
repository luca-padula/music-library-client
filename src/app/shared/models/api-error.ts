interface ApiError {
   message: string
   status: number
   validationErrors?: string[]
}

const emptyApiError = { message: "", status: 0, validationErrors: undefined }

export { ApiError, emptyApiError }
