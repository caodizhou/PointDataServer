package controller;

import Util.JsonUtils;
import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import service.PointService;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by cdz on 2017/10/14.
 */
@Controller
@ComponentScan("service")
public class PointData {

    @Autowired
    PointService pointService;

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index() {
//        System.out.println("aaa");
        return "index";
    }

    @RequestMapping(value = "/pointData", method = RequestMethod.GET)
    @ResponseBody
    public String test() {
        return JSON.toJSONString(pointService.getPointLists());
    }

    @RequestMapping(value = "/pointPersistence", method = RequestMethod.POST)
    @ResponseBody
    public String doPersistence(@RequestParam("boxmap") String boxmap){
        Map boxMap = new HashMap<String,HashMap<String,HashMap<String,String>>>();
        boxMap = JsonUtils.json2Map(boxmap);
        return JSON.toJSONString(pointService.doPersistence(boxMap));
    }
}
