// Import controlers
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const checkUserFn = require('./middlewares/checkUserFn');
const checkUserFnSolution = require('./middlewares/checkUserFnSolution');


// Match URL's with controllers
exports.appRoute = router => {

    router.post('/api/user/login', authController.processLogin);
    router.post('/api/user/register', authController.processRegister);
    router.post('/api/user/process-submission', checkUserFnSolution.checkForValidUserRoleUser, userController.processDesignSubmission);
    router.put('/api/user/', checkUserFnSolution.checkForAdmin, userController.processUpdateOneUser);
    router.put('/api/user/design/', checkUserFnSolution.checkForValidUserRoleUser, userController.processUpdateOneDesign);
    router.post('/api/user/processInvitation/',checkUserFnSolution.checkForValidUserRoleUser, userController.processSendInvitation);

    router.get('/api/user/process-search-design/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetSubmissionData);
    router.get('/api/user/process-search-user/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetUserData);
    router.get('/api/user/process-search-user-design/:pagenumber/:search?', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetSubmissionsbyEmail);
    router.get('/api/user/:recordId', checkUserFnSolution.viewProfile, userController.processGetOneUserData);
    router.get('/api/user', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetOneUserData)
    router.get('/api/user/design/:fileId', checkUserFnSolution.checkForValidUserRoleUser, userController.processGetOneDesignData);

};