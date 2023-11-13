
const getExpirationTime = function () {
    const sessionTime=Date.now()
    const expireTime=sessionTime+ (30 * 24 * 60 * 60 * 1000)

    return{sessionTime,expireTime}
  };

module.exports=getExpirationTime