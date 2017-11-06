package service;

import dao.PointFileDao;
import dto.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by cdz on 2017/10/14.
 */
@Service
@ComponentScan("dao")
public class PointService {
    @Autowired
    PointFileDao pointFileDao;
    public List<List<Point>> getPointLists(){
        return pointFileDao.GetPoints();
    }
}
