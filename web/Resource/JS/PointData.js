/**
 * Created by cdz on 2017/10/14.
 */
var point3d = null;
function pointload() {
    $.ajax({
        type: "get",
        url: "pointData",
        dataType: "json",
        success: function (data) {
            var contain3d = document.getElementById("pointcloud3d");
            // var contain2d = document.getElementById("pointcloud2d");
            var scale_point = new scale("#progress-button", "#all-progress", "#current-progress", data.length);
            point3d = new pointCloud3d(data, contain3d, scale_point, $('.PointCloudView').eq(0).height(), $('.PointCloudView').eq(0).width());
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
                    messageboxes.setMessage('error','自动添加帧失败,该ID不存在!');
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
                messageboxes.setMessage('success','自动添加帧成功!');
            });
            d3.select("#removeInput").on("click",function () {
                var id = Number($("#BoxIdInput").val());
                var map = point3d.boxControl.boxmap;
                map.get(id).delete(point3d.dataindex);
                var svg = d3.select("svg.pointCloud3d");
                !svg.empty()&&deleteRectById(id,svg);
                messageboxes.setMessage('success','删除帧成功!');
            });
            d3.select("#submitInput").on("click",function () {
                var oldid = d3.select("#BoxIdInput").property("oldId");
                var id = Number($("#BoxIdInput").val());
                var map = point3d.boxControl.boxmap;
                var oldStartFrame = d3.select("#BoxIdInput").property("oldStartFrame");
                var oldEndFrame = d3.select("#BoxIdInput").property("oldEndFrame");
                var oldFrameType = d3.select("#BoxIdInput").property("oldFrameType");
                var startFrame = $('#startFrame').val()?$('#startFrame').val():null;
                var endFrame = $('#endFrame').val()?$('#endFrame').val():null;
                var frameType = $('#frameType').val();
                var oldKeyFrame = map.get(oldid).get("oldKeyFrame");
                var tempKeyFrame = frameType== 1 ? point3d.dataindex:oldKeyFrame;
                if (Number(startFrame) > Number(endFrame) ||
                    Number(startFrame) > Number(tempKeyFrame) ||
                    tempKeyFrame > endFrame ||
                    Number(startFrame) < 0 ||
                    Number(endFrame)< 0
                )
                {
                    messageboxes.setMessage('warning','请设置合适的起止帧!');
                    return;
                }
                if(oldid!=id) {
                    if(map.get(id)!=null&&map.get(id).get(point3d.dataindex)!=null){
                        messageboxes.setMessage('error','该id已存在!');
                        return;
                    }
                    var box = map.get(oldid).get(point3d.dataindex);
                    if(box==null){
                        messageboxes.setMessage('warning','原框不存在!');
                        return;
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
                }
                if(frameType != oldFrameType){
                    if(frameType == 1){
                        map.get(id).set("keyFrame",point3d.dataindex);
                        var box_temp = map.get(id).get(point3d.dataindex)
                        box_temp.getHeight(point3d.data[point3d.dataindex])
                        if(oldKeyFrame !=null){
                            map.get(id).get(oldKeyFrame).frameType = 0;
                            map.get(id).get(oldKeyFrame).auto = false;
                        }
                        map.get(id).get(point3d.dataindex).frameType = frameType;
                    } else {
                        map.get(id).set("keyFrame",null);
                        map.get(id).get(point3d.dataindex).frameType = frameType;
                    }
                }
                if(startFrame != null && endFrame != null
                    &&  0 <= startFrame < endFrame
                ){
                    map.get(id).set("startFrame",Number(startFrame));
                    map.get(id).set("endFrame",Number(endFrame));

                    if(map.get(id).get(Number(startFrame))){
                        map.get(id).get(Number(startFrame)).auto = false;
                    }else{
                        var box_temp = map.get(id).get(point3d.dataindex);
                        var box = new Box(box_temp.x,box_temp.y,box_temp.w,box_temp.l,box_temp.r,id,startFrame);
                        box.getHeight(point3d.data[startFrame])
                        box.auto = false;
                        map.get(id).set(Number(startFrame),box);
                    }
                    if(map.get(id).get(Number(endFrame))){
                        map.get(id).get(Number(endFrame)).auto = false;
                    }else{
                        var box_temp = map.get(id).get(point3d.dataindex);
                        var box = new Box(box_temp.x,box_temp.y,box_temp.w,box_temp.l,box_temp.r,id,endFrame);
                        box.auto = false;
                        box.getHeight(point3d.data[endFrame])
                        map.get(id).set(Number(endFrame),box);
                    }
                }
                map.get(id).set("type",$('#type').val());
                messageboxes.setMessage('success','设置更改成功!');
            });
            d3.select("#persistenceInput").on("click",function () {
                console.log(JsonUtils.mapToObj(point3d.boxControl.boxmap))
                let boxmapJson = JsonUtils.mapToObj(point3d.boxControl.boxmap)
                
                $.ajax({
                    type: "post",
                    url: "pointPersistence",
                    dataType: "json",
                    // contentType: "application/json; charset=utf-8",
                    data: {'boxmap':JSON.stringify(boxmapJson)},
                    success: function (data) {
                        messageboxes.setMessage('success','持久化到xml成功!');
                    },
                    error: function () {
                        messageboxes.setMessage('error','持久化到xml失败!');
                    }
                })
            })
            function clickSwitch() {
                if ($("#onoffswitch2").is(':checked')) {
                    point3d.updateCube();
                    // d3.selectAll(".pointCloud2d")
                    //     .style("visibility", "hidden");
                    // d3.selectAll(".pointCloud3d")
                    //     .style("visibility", "visible");
                    point3d.controls.target.copy(point3d.controls2d.target);
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

