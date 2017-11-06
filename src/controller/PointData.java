package controller;

import com.alibaba.fastjson.JSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import service.PointService;

/**
 * Created by cdz on 2017/10/14.
 */
@Controller
@ComponentScan("service")
public class PointData {
    @Autowired
    PointService pointService;

    @Value("${file.path}")
    private String haha;

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
}
