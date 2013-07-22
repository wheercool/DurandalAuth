/** 
    * @module Manage registering users
    * @requires appsecurity
    * @requires router
    * @requires errorHandler
*/

define(['services/appsecurity', 'durandal/plugins/router', 'services/errorhandler'],
    function (appsecurity, router, errorhandler) {

        var username = ko.observable().extend({ required: true }),
            email = ko.observable().extend({ required: true, email : true }),
            password = ko.observable().extend({ required: true, minLength: 6 }),
            confirmpassword = ko.observable().extend({ required: true, minLength: 6, equal : password });
        
        var viewmodel =  {
            
            /** @property {observable} confirmNewPassword */
            username : username,
            
            /** @property {observable} email */
            email : email,
            
            /** @property {observable} password */
            password :  password,
            
            /** @property {observable} confirmpassword */
            confirmpassword : confirmpassword,
            
            /**
             * Register a new user
             * @method
            */
            register : function () {
                var self = this;
                ga('send', 'pageview');
                if (this.errors().length != 0) {                    
                    this.errors.showAllMessages();
                    return;
                }

                appsecurity.register(this.username(), this.email(), this.password(), this.confirmpassword())
                    .fail(self.handlevalidationerrors)
                }
        }

        errorhandler.includeIn(viewmodel);

        viewmodel["errors"] = ko.validation.group(viewmodel);

        return viewmodel;
});