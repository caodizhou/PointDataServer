/**
 * Created by cdz on 2017/10/14.
 */
function pointload() {
    $.ajax({
        type: "get",
        url: "pointData",
        dataType: "json",
        success: function (data) {
            var contain3d = document.getElementById("pointcloud3d");
            // var contain2d = document.getElementById("pointcloud2d");
            var scale_point = new scale("#progress-button", "#all-progress", "#current-progress", data.length);
            var point3d = new pointCloud3d(data, contain3d, scale_point);
            var boxcontrol = new BoxControl();
            point3d.boxControl = boxcontrol;
            // var point2d = new pointCloud2d(data, contain2d, scale_point);
            point3d.drawPointCloud3d();
            // point2d.drawPointCloud2d();
            scale_point.start();
            point3d.createbrush();
            d3.select("#interpolateInput").on("click",function () {
                var id = Number($("#BoxIdInput").val());
                var map = point3d.boxControl.boxmap;
                if(map.get(id)==null){
                    alert("该ID不存在");
                }
                var dataindexmap = map.get(id);
                var index = point3d.dataindex;
                for(var i=point3d.dataindex-1;i>=0;i--){
                    if(dataindexmap.get(i)&&dataindexmap.get(i).auto == false){
                        index = i;
                        break;
                    }
                }
                if(index<point3d.dataindex){
                    point3d.boxControl.interpolation(id,index,point3d.dataindex);
                }
                for(var i=point3d.dataindex+1;i<data.length;i++){
                    if(dataindexmap.get(i)&&dataindexmap.get(i).auto == false){
                        index = i;
                        break;
                    }
                }
                if(index>point3d.dataindex){
                    point3d.boxControl.interpolation(id,point3d.dataindex,index);
                }
            });
            d3.select("#removeInput").on("click",function () {
                var id = Number($("#BoxIdInput").val());
                var map = point3d.boxControl.boxmap;
                map.get(id).delete(point3d.dataindex);
                var svg = d3.select("svg.pointCloud3d");
                !svg.empty()&&deleteRectById(id,svg);
            });
            d3.select("#submitInput").on("click",function () {
                var oldid = d3.select("#BoxIdInput").property("oldId");
                var id = Number($("#BoxIdInput").val());
                if(oldid==id) {
                    return;
                }
                var map = point3d.boxControl.boxmap;
                if(map.get(id)!=null&&map.get(id).get(point3d.dataindex)!=null){
                    alert("该id已存在");
                    return;
                }
                var box = map.get(oldid).get(point3d.dataindex);
                if(box==null){
                    alert("原框不存在");
                }
                map.get(oldid).delete(point3d.dataindex);
                if(map.get(id)!=null){
                    map.get(id).set(point3d.dataindex,box);
                }
                else {
                    var indexmap = new Map;
                    indexmap.set(point3d.dataindex,box);
                    map.set(id,indexmap);
                }
                d3.select("#BoxIdInput").property("oldId",id);
                var svg = d3.select("svg.pointCloud3d");

                !svg.empty()&&changeRectId(oldid,id,svg);
            });
            function clickSwitch() {
                if ($("#onoffswitch2").is(':checked')) {
                    point3d.updateCube();
                    // d3.selectAll(".pointCloud2d")
                    //     .style("visibility", "hidden");
                    // d3.selectAll(".pointCloud3d")
                    //     .style("visibility", "visible");
                    point3d.removebrush();
                    point3d.generateCube();
                } else {
                    point3d.removeCube();
                    point3d.reset22d();
                    point3d.renderer.render(point3d.scene, point3d.camera);

                    point3d.createbrush();
                    point3d.generatebrush();
                }
            }
            d3.select("#onoffswitch2")
                .on("click", clickSwitch);
        }

    })

}

pointload();

