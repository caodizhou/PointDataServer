package service;

import dao.PointFileDao;
import dao.PointPersistenceDao;
import dto.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by cdz on 2017/10/14.
 */
@Service
@ComponentScan("dao")
public class PointService {
    @Autowired
    PointFileDao pointFileDao;

    @Autowired
    PointPersistenceDao pointPersistenceDao;

    public List<List<Point>> getPointLists(){
        return pointFileDao.GetPoints();
    }

    public String doPersistence(Map boxMap){
        return pointPersistenceDao.DoPersistence(boxMap);
    }
}
