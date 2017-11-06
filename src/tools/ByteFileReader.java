package tools;





import dto.Point;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by cdz on 2017/10/14.
 */
public class ByteFileReader {

    public static List<Point> getPointsbyByteFile(String url) {
        FileInputStream input = null;
        List<Point> points;
        try {
            input = new FileInputStream(url);
            points = new ArrayList<>();
            DataInputStream d = new DataInputStream(input);
            byte[] buffer = new byte[4];
            int count = 0;
            int i=0;
            Point p = null;
            while (true) {
                count++;
                int len = d.read(buffer,0,4);
                if (len == -1) {
                    break;
                }
                Float f= byte2float(buffer,0);
                if(i==0){
                    p = new Point();
                }
                switch (i){
                    case 0:p.setX(f);break;
                    case 1:p.setY(f);break;
                    case 2:p.setZ(f);break;
                    default:p.setValue(f);
                }
                if(i==3){
                    points.add(p);
                }
                i=(i+1)%4;

            }
            System.out.println("count="+count);
            return points;
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                input.close();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
    }
    private static float byte2float(byte[] b, int index) {
        int l;
        l = b[index + 0];
        l &= 0xff;
        l |= ((long) b[index + 1] << 8);
        l &= 0xffff;
        l |= ((long) b[index + 2] << 16);
        l &= 0xffffff;
        l |= ((long) b[index + 3] << 24);
        return Float.intBitsToFloat(l);
    }
}
