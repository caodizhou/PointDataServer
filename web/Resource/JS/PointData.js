/**
 * Created by cdz on 2017/10/14.
 */
function pointload() {
    $.ajax({
        type:"get",
        url:"pointData",
        dataType:"json",
        success:function (data) {
            var contain3d = document.getElementById("pointcloud3d");
            var scale_point = new scale("#progress-button","#all-progress","#current-progress",data.length);
            var point3d = new pointCloud3d(data,contain3d,scale_point);
            point3d.drawPointCloud3d();
            scale_point.start();
        }
    })
}
pointload();

