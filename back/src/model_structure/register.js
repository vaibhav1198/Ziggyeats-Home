class Register{
    constructor(obj){
        this.name = obj.name;
        this.password = obj.password;
        this.email = obj.email;
        this.admin = false;
        this.address = obj.address;
        this.phone = obj.phone;
    }
}

module.exports = Register;