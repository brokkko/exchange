export default class SignUpUserDTO {
    email;
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}