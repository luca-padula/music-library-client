interface UserSignup {
   userName: string
   firstName: string
   lastName: string
   password: string
   confirmPassword: string
}

const emptyUserSignup: UserSignup = {
   userName: "",
   firstName: "",
   lastName: "",
   password: "",
   confirmPassword: "",
}

export { UserSignup, emptyUserSignup }
