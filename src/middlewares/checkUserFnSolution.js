const config = require('../config/config');
const jwt = require('jsonwebtoken');
const userManager = require('../services/userService');
module.exports.checkForValidUserRoleUser = (req, res, next) => {
    //If the token is valid, the logic extracts the user id and the role information.
    //If the role is not user, then response 403 UnAuthorized
    //The user id information is inserted into the request.body.userId
        console.log('http header - user ', req.headers['user']);
        if (typeof req.headers.authorization !== "undefined") {
            // Retrieve the authorization header and parse out the
            // JWT using the split function
            console.log(req.headers)
            let token = req.headers.authorization.split('Bearer ')[1];
            console.log("Token: ", token)
            //console.log('Check for received token from frontend : \n');
            //console.log(token);
            jwt.verify(token, config.JWTKey, (err, data) => {
                console.log('data extracted from token \n',data);
                if (err) {
                    console.log(err);
                    return res.status(403).send({ message: 'Unauthorized access' });
                }
                else {
                    req.body.userId = data.id;
                    next();
                }
            })
  
      }else{
        res.status(403).send({ message: 'Unauthorized access' });

      }
    } //End of checkForValidUserRoleUser

module.exports.checkForAdmin = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split('Bearer ')[1];
        console.log("Checking for Admin")
        //console.log('Check for received token from frontend : \n');
        //console.log(token);
        jwt.verify(token, config.JWTKey, (err, data) => {
            console.log('data extracted from token \n',data);
            userManager.getOneUserData(data.id)
            .then((results) => {
                console.log("Results: ", results)
                let role = results[0].role_id;
                console.log("Role: ", role);
                if (err || role != 1) {
                    console.log(err);
                    return res.status(403).send({ message: 'Unauthorized access' });
                }
                else {
                    req.body.userId = data.id;
                    next();
                }
            })
        })
  }else{
    res.status(403).send({ message: 'Unauthorized access' });
  }
}//End Check For Admin

module.exports.viewProfile = (req, res, next) => {
    if (typeof req.headers.authorization !== "undefined") {
        // Retrieve the authorization header and parse out the
        // JWT using the split function
        let token = req.headers.authorization.split('Bearer ')[1];
        console.log("Header: ", req.headers.authorization)
        console.log("Token: ", token)
        console.log("Checking Profile, ParamID: ", req.params.recordId == null)
        //console.log('Check for received token from frontend : \n');
        //console.log(token);
        jwt.verify(token, config.JWTKey, (err, data) => {
            console.log('data extracted from token \n',data);
            if(token != 'null'){
                userManager.getOneUserData(data.id)
                .then((results) => {
                    console.log("Results: ", results)
                    let role = results[0].role_id;
                    console.log("Role: ", role);
                    let paramID = req.params.recordId;
                    if(paramID == null){
                        paramID = results[0].user_id;
                    }
                    console.log(paramID)
                    if (err || (role != 1 && paramID != results[0].user_id)) {
                        console.log("err: ", err);
                        return res.status(403).send({ message: 'Unauthorized access' });
                    }
                    else {
                        req.body.userId = data.id;
                        next();
                    }
                })
            }else{
                return res.status(403).send({ message: 'Unauthorized access' });
            }
        })
  }else{
    res.status(403).send({ message: 'Unauthorized access' });
  }
}