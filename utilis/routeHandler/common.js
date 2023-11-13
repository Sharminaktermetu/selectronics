var mongoose = require('mongoose');
 

const getId = (id) => {
    if(id){
        if(id.length !== 24){
            return id;
        }
    }
    return mongoose.Types.ObjectId(id);
};

module.exports={getId}