function generateAuthError(message) {
    switch (message) {
        case "EMAIL_NOT_FOUND":
            return "Email or password is incorrect";
        case "INVALID_PASSWORD":
            return "Email or password is incorrect";
        case "EMAIL_EXISTS":
            return "User with this email already exists";
        default:
            return "Too many login attempts. Try again later";
    }
}

export default generateAuthError;
