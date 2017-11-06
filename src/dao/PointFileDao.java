package dao;

import dto.Point;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Repository;
import tools.ByteFileReader;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cdz on 2017/10/14.
 */
@Repository
public class PointFileDao {
    @Value("${file.path}")
    private String datafile;
    public List<List<Point>> GetPoints(){
        File file = new File(datafile);
        List<List<Point>> pointLists = new ArrayList<>();
        if(!file.exists()){
            System.out.println("文件不存在");
            return pointLists;
        }
        if (!file.isDirectory()){
            pointLists.add(ByteFileReader.getPointsbyByteFile(datafile));
            return pointLists;
        }
        else {
            File[] files = file.listFiles();
            for(File tempfile:files){
                pointLists.add(ByteFileReader.getPointsbyByteFile(tempfile.getAbsolutePath()));
            }
            return pointLists;
        }
    }
}
