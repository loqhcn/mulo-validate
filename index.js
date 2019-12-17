module.exports = {

    //phone number 
    mobile:function(phone){
        return /^1[0-9]{10}$/.test(phone);
    },
    phone:function(phone){
        return this.mobile(phone);
    }

}