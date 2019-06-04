var validator = {};

//validate name and email for registration
validator.validateRegistration = (user) => {
    // console.log("validate",user.name)
    // const name = user.name;
    const email = user.email;

    // if (!name.match(/^[a-zA-Z0-9].*[a-zA-Z0-9]{5,}$/)) {
    //     const err = new Error('Enter a valid name');
    //     err.status = 400;
    //     throw err;
    // }

    if (!email.match(/^[a-zA-Z].*@{1}[a-zA-Z]+\.{1}com$/)) {
        const err = new Error('Enter a valid email');
        err.status = 400;
        throw err;
    }

}
//validator.validateRegistration({name:'navraj',email:'navrajskkaler@yahoo.com'});
module.exports = validator;