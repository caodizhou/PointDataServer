/**
 * Created by lijie on 17/11/10.
 */
var JsonUtils = {
    mapToObj: function (map){
        var obj = {}
        JsonUtils.iterator(map,(key,value)=>{
            if(JsonUtils.isSimpleType(value))
                obj[key] = value
            else obj[key] = JsonUtils.mapToObj(value)
        })
        return obj
    },
    isSimpleType: function (data){
        return !((data instanceof Map) || (data instanceof Array) || (data instanceof Object))
    },
    iterator : function (data,callback){
        if(data instanceof Map)
            for (let [key, value] of data) {
                callback(key, value)
            }
        else if(data instanceof Array)
            data.forEach((value,key)=>{
                callback(key, value)
            })
        else
            for(let key in data){
                if (data.hasOwnProperty(key) === true){
                    callback(key, data[key])
                }
            }
    }

}