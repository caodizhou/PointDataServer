<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PointCloud</title>
    <link type="text/css" href="/Resource/CSS/Switch.css" rel="stylesheet">
    <link type="text/css" href="/Resource/CSS/PointCloud2d.css" rel="stylesheet">
    <link type="text/css" href="/Resource/CSS/ProcessBar.css" rel="stylesheet">
    <link type="text/css" href="https://cdn.bootcss.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <link type="text/css" href="Resource/CSS/index.css" rel="stylesheet">
    <link type="text/css" href="Resource/CSS/info/Lobibox.min.css" rel="stylesheet">
    <script src="Resource/JS/JsonUtils.js"></script>
    <script src="/Resource/JSLIB/three.js"></script>
    <script src="/Resource/JSLIB/Stats.js"></script>
    <script src="/Resource/JSLIB/dat.gui.js"></script>
    <script src="/Resource/JSLIB/OrbitControls.js"></script>
    <script src="/Resource/JSLIB/jquery-3.2.1.min.js"></script>
    <script src="/Resource/JSLIB/d3.js"></script>
    <script src="/Resource/JSLIB/d3-brush.js"></script>
    <script src="/Resource/JSLIB/pixi.min.js"></script>
    <script src="/Resource/JS/PointData.js"></script>
    <script src="/Resource/JS/Pointcloud.js"></script>
    <script src="/Resource/JS/PointCloudpixi.js"></script>
    <script src="/Resource/JS/myRect.js"></script>

</head>
<body>
<div class="PointCloudView">

    <div class="brush" style="position: absolute;top:50%;z-index:9999">
        <button id="brush" class="btn btn-danger">brush</button>
    </div>
    <div class="frame-index">
        <span>当前第</span>  <span id="frameIndex">0</span> <span>帧</span>
    </div>
    <!--<input type="file" name="file" id='filea' onchange='aShow()'/>-->
    <div class="progress-bar1" id="processBar">
        <div id="all-progress">
            <div id="current-progress">
                <span id="progress-button"></span>
            </div>
        </div>
    </div>
    <div id="pointcloud3d" style="position: absolute ;"></div>
    <div id="pointcloud2d" style="position: absolute ;"></div>
</div>
<div class="ControlPanel">
    <div class="ControlPanel">
        <div  class="top-panel">
            <div class="testswitch">
                <input class="testswitch-checkbox" id="onoffswitch" type="checkbox">
                <label class="testswitch-label" for="onoffswitch">
                    <span class="testswitch-inner" data-on="ON" data-off="OFF"></span>
                    <span class="testswitch-switch"></span>
                </label>
            </div>
            <div class="testswitch">
                <input class="testswitch-checkbox" id="onoffswitch2" type="checkbox">
                <label class="testswitch-label" for="onoffswitch2">
                    <span class="testswitch-inner" data-on="3D" data-off="2D"></span>
                    <span class="testswitch-switch"></span>
                </label>
            </div>
        </div>
        <div>
            <div>
                <div class="input-group">
                    <span class="input-group-addon">id</span>
                    <input type="text" class="form-control" id="BoxIdInput">
                </div>

                <div class="input-group">
                    <span class="input-group-addon">x  </span>
                    <input type="text" class="form-control" id="xInput" readonly>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">y</span>
                    <input type="text" class="form-control" id="yInput" readonly>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">l</span>
                    <input type="text" class="form-control" id="lengthInput" readonly>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">w</span>
                    <input type="text" class="form-control" id="widthInput" readonly>
                </div>
                <div class="input-group">
                    <span class="input-group-addon">帧类型</span>

                    <select class="form-control" id="frameType">
                        <option value="0">普通帧</option>
                        <option value="1">关键帧</option>
                    </select>
                </div>

                <div class="input-group">
                    <span class="input-group-addon">启止帧</span>
                    <input type="text" class="form-control" id="startFrame" style="
                        width: 47%;
                        float: none;
                    ">to<input type="text" class="form-control" id="endFrame" style="
                        width: 47%;
                        float: none;
                    ">
                </div>
            </div>
            <div class="button-box">
                <input type="button" id="submitInput" value="Submit" class="btn btn-default">
                <input type="button" id="interpolateInput" value="interpolate" class="btn btn-default">
                <input type="button" id="removeInput" value="remove" class="btn btn-default">
                <input type="button" id="persistenceInput" value="persistence" class="btn btn-primary">
            </div>
        </div>
    </div>
</div>

</body>
<script>
    $(window).resize(function() {
        if(point3d){
            point3d.HEIGHT = $('.PointCloudView').eq(0).height();
            point3d.WIDTH = $('.PointCloudView').eq(0).width();
            point3d.renderer.setSize(point3d.WIDTH, point3d.HEIGHT);
            point3d.camera.aspect = point3d.WIDTH / point3d.HEIGHT;
            point3d.camera.updateProjectionMatrix();
            d3.select("svg.pointCloud3d")
                    .style("height", point3d.HEIGHT)
                    .style("width", point3d.WIDTH)
            ;
            point3d.refrushbrush();
        }
    });
</script>
<script src="/Resource/JS/ProcessBar.js"></script>
<script src="Resource/JS/bootstrap.min.js"></script>
<script src="Resource/JS/lib/lobibox.min.js"></script>
<script src="Resource/JS/lib/messageboxes.min.js"></script>
<script src="Resource/JS/lib/notifications.min.js"></script>
<script src="Resource/JS/message.js"></script>
</html>