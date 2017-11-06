package dto;

/**
 * Created by cdz on 2017/10/14.
 */
public class Point {
    private float x;
    private float y;
    private float z;
    private float value;

    public Point() {
    }

    public Point(float x, float y, float z, float value) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.value = value;
    }

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public float getZ() {
        return z;
    }

    public void setZ(float z) {
        this.z = z;
    }

    public float getValue() {
        return value;
    }

    public void setValue(float value) {
        this.value = value;
    }
}
