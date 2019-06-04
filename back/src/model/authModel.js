const connection = require('../utilities/connections');

var authModel = {};
//genertating unique customerid
authModel.generateUserId = () => {
    return connection.getAuthentications().then((model) => {
        return model.find({}, { customerId: 1 }).then((idArr) => {
            var lastId = Number(idArr[idArr.length - 1].customerId);
            return lastId + 1
        })
    })

}

//registration model
authModel.mRegistration = (user) => {
    console.log(user)
    return connection.getAuthentications()
        .then((model) => {
            return model.find({ $or: [{ phone: user.phone }, { email: user.email }] }, {})
                .then((response1) => {
                    console.log(response1)
                    if (response1.length != 0) return null;
                    //calling generateUserId function to generate unique customerid
                    return authModel.generateUserId().then((id) => {
                        user.customerId = id;
                        return model.create(user).then((response2) => {
                            return user.customerId;
                        })
                    })
                })
        })
}

// update data
authModel.mUpdateDetails = (user) => {
    console.log(user)
    var addr = user.address
    var temp = addr.split('\n')
    var tt = ''
    for(let i = 0; i< temp.length;i++){
        tt += temp[i] + ' ' 
    }
    console.log(tt)
    user.address = tt
    return connection.getAuthentications()
        .then((model) => {
            return model.update({ email: user.email }, {
                $set: {
                    address: user.address,
                    phone: user.phone,
                    password: user.password
                }
            })
                .then((response1) => {
                    //console.log(response1)
                    if (response1.nModified == 0) return null;
                    //calling generateUserId function to generate unique customerid
                    // return model.updateOne().then((response2) => {
                    return user
                })
        })
}



authModel.mLogin = (user) => {
    return connection.getAuthentications()
        .then((model) => {
            return model.find({ $and: [{ email: user.email }, { password: user.password }] })
                .then((response) => {
                    if (response.length == 0) return null;
                    else {
                        return model.updateOne({ customerId: response[0].customerId }, { $set: { loggedIn: true } })
                            .then((response2) => {
                                //console.log(response2);
                                return response;
                            })

                    }
                })
        })
}

authModel.mInsertLoginUser = (user) => {
    return connection.getAuthentications().then((model2) => {
        return model2.findOne({ email: user.email }, { _id: 0, customerId: 1 }).then((customerId) => {
            return connection.getLoginUsers()
                .then((model) => {
                    //console.log(typeof customerId)
                    return model.find({ customerId: customerId.customerId }, {}).then((res1) => {
                        //console.log(res1)
                        if (res1.length != 0) return "already loggedin";
                        else {
                            user.customerId = customerId.customerId
                            model.create(user).then((res2) => {
                                return res2
                            })
                        }
                    })
                })
        })
    })
}

authModel.mGetLoginUser = (custId) => {
    return connection.getLoginUsers().then((model) => {
        return model.find({ customerId: custId }, { _id: 0, admin: 1, customerId: 1 }).then((user) => {
            //console.log(user.length)
            if (user.length != 0) return user;
            else return null;
        })
    })
}

authModel.mDeleteLoginUser = (custId) => {

    return connection.getLoginUsers().then((model) => {
        return model.remove({ customerId: custId }).then((response) => {
            //console.log("response", response)
            if (response.n == 1) return 1;
            else return null;
        })
    })
}


authModel.mGetDetails = (custId) => {
    return connection.getAuthentications()
        .then((model) => {
            return model.find({ customerId: custId }, {})
                .then((resp) => {
                    if (resp.length != 0) return resp;
                    else return null;
                })
        })
}

//fetching Restaurants from database
authModel.getRestaurants = () => {
    return connection.getRestaurants().then(model => {
        return model.find({}, { _id: 0 }).then(list => {
            if (list.length > 0) {
                return list
            }
            else {
                return null
            }
        })
    })
}

authModel.mDecreaseCoupons = (customerId) =>{
    return connection.getAuthentications().then((model)=>{
        return model.findOne({customerId: customerId}, {_id:0,coupons:1}).then((coupons)=>{
            if(coupons){
                return model.updateOne({customerId: customerId}, {$set:{coupons: coupons.coupons-1}}).then((response)=>{
                if(response){
                    return response
                }
                else return null
                })
            }
            else return null
        })
    })
}


module.exports = authModel;