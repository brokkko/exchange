export default class UserDTO {
    id;
    firstname;
    lastname;
    email;
    password;
    founds;
    status;
    stocks;


    constructor(id, firstname, lastname, email, password, founds, status, stocks) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.founds = founds;
        this.status = status;
        this.stocks = stocks;
    }
}