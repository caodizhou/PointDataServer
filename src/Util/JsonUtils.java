package Util;

import com.alibaba.fastjson.JSON;

import java.util.Map;

/**
 * Created by lijie on 17/11/10.
 */
public class JsonUtils {


    @SuppressWarnings("unchecked")
    public static Map<String,Object> json2Map(String json){
        return JSON.parseObject(json, Map.class);
    }

    public static String obj2JsonString(Object obj){
        return JSON.toJSONString(obj);
    }

}
