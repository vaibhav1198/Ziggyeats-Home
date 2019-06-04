const validator = require('../utilities/validator');
const authModel = require('../model/authModel');
const authService = {};

//register user service
authService.register = (user) =>{
    //console.log("service",user)
    validator.validateRegistration(user);
    //console.log(user)
    return authModel.mRegistration(user)
    .then((customerId)=>{
        if(customerId == null){
            var err = new Error('Email or Phone Number already exists');
            err.status = 400;
            throw err;
        }
        else{
            return customerId;
        }
    })
}

// update data
authService.updateDetails = (user) =>{
    //console.log("service",user)
    validator.validateRegistration(user);
    //console.log(user)
    return authModel.mUpdateDetails(user)
    .then((response)=>{
        if(response == null){
            var err = new Error('Fail to update data');
            err.status = 400;
            throw err;
        }
        else{
            return response;
        }
    })
}

authService.login = (user)=>{
    return authModel.mLogin(user).then((name)=>{
        if(name== null){
            var err = new Error('name or password is incorrect');
            err.status = 400;
            throw err;
        }
        else{
            return name;
        }
    })
}

authService.insertLoginUser = (user) =>{
    return authModel.mInsertLoginUser(user).then((response)=>{
        // if(response == 'already loggedin'){
        //     var err = new Error('User already logged in')
        //     err.status = 400;
        //     throw err;
        // }
        // else 
        return "logged in user added to db"
    })
}

authService.getLoginUser = (custId)=>{
    return authModel.mGetLoginUser(custId).then((response)=>{
        if(response) return response;
        else {
            ////console.log(user);
            var err = new Error('User not logged in');
            err.status = 400;
            throw err;
        }
    })
}

authService.deleteLoginUser = (custId)=>{
    return authModel.mDeleteLoginUser(custId).then((response)=>{
        if(response) return response;
        else{
            var err = new Error('Error in deleting');
            err.status = 400;
            throw err;
        }
    })
}

authService.getDetails = (custId)=>{
    //console.log(custId)
    return authModel.mGetDetails(custId).then((res)=>{
       if(res == null){
           var err = new Error('No details found');
           err.status = 400;
           throw err;
       }
       else{
           return res
       }
    })
}


authService.decreaseCoupons = (customerId) =>{
    return authModel.mDecreaseCoupons(customerId).then((response)=>{
        if(response) return response
        else{
            var err = new Error('Error while updating coupons');
            err.status = 400;
            throw err;
        }
    })
}
 
 



module.exports = authService;