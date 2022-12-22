var validator = require("validator")

var validationFn = {

    sanitize: function(value){
        if(typeof value === "string") {
           return validator.escape(value);
        }
    },

    sanitizeDesign: function(input){
        for(var i = 0; i < input.length; i++){
            var design = input[i];
            var title = design.design_title;
            var desc = design.design_description;
            design.design_title = this.sanitize(title);
            design.design_description = this.sanitize(desc);
        }
    },//End Validate Output

    sanitizeUser: function(input){
        for(var i = 0; i < input.length; i++){
            var user = input[i];
            user.fullname = this.sanitize(user.fullname)
            user.email = this.sanitize(user.email)
        }
    }
}

module.exports = validationFn