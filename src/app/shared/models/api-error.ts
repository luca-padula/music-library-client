interface ApiError {
   message: string
   status: number
   validationErrors?: string[]
}

const emptyApiError: ApiError = {
   message: "",
   status: 0,
   validationErrors: undefined,
}

export { ApiError, emptyApiError }
