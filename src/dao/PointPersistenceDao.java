package dao;

import com.alibaba.fastjson.JSONObject;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.springframework.stereotype.Repository;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by lijie on 17/11/10.
 */
@Repository
public class PointPersistenceDao {
    public String DoPersistence(Map boxMap){
        //DocumentHelper提供了创建Document对象的方法
        Document document = DocumentHelper.createDocument();
        //添加节点信息
        Element boxes = document.addElement("boxes");

        Iterator it0 = boxMap.entrySet().iterator();
        while(it0.hasNext()){
            Map.Entry e0 = (Map.Entry) it0.next();
            String key0 = (String)e0.getKey();
            JSONObject value0 = (JSONObject)e0.getValue();
            System.out.println(value0.size());
            if (value0.size()==0){
                continue;
            }
            Element box = boxes.addElement("box");
            box.addAttribute("id",key0);

            Iterator it1 = value0.entrySet().iterator();
            while (it1.hasNext()){
                Map.Entry e1 = (Map.Entry) it1.next();
                String key1 = (String) e1.getKey();
                JSONObject value1 = (JSONObject)e1.getValue();

                Element frame = box.addElement("frame");
                frame.addAttribute("id",String.format("%010d", (Integer.parseInt(key1))));

                Iterator it2 = value1.entrySet().iterator();
                while (it2.hasNext()){
                    Map.Entry e2 = (Map.Entry) it2.next();
                    String key2 = (String) e2.getKey();
                    Object value2 = e2.getValue();

                    Element param = frame.addElement("param");
                    param.addAttribute("name",key2);
                    param.setText(value2.toString());
                }
            }
        }
        System.out.println(document.asXML()); //将document文档对象直接转换成字符串输出
        //把生成的xml文档存放在硬盘上  true代表是否换行
        OutputFormat format = new OutputFormat("    ",true);
        format.setEncoding("UTF-8");//设置编码格式
        XMLWriter xmlWriter = null;
        try {
            xmlWriter = new XMLWriter(new FileOutputStream("/Users/lijie/Documents/项目/PointDataServer/web/Resource/xml/demo1.xml"),format);
            xmlWriter.write(document);
            xmlWriter.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";
    }
}
