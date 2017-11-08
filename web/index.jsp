<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PointCloud</title>
    <link type="text/css" href="/Resource/CSS/Switch.css" rel="stylesheet">
    <link type="text/css" href="/Resource/CSS/PointCloud2d.css" rel="stylesheet">
    <link type="text/css" href="/Resource/CSS/ProcessBar.css" rel="stylesheet">
    <script src="/Resource/JSLIB/three.js"></script>
    <script src="/Resource/JSLIB/Stats.js"></script>
    <script src="/Resource/JSLIB/dat.gui.js"></script>
    <script src="/Resource/JSLIB/OrbitControls.js"></script>
    <script src="/Resource/JSLIB/jquery-3.2.1.min.js"></script>
    <script src="/Resource/JSLIB/d3.js"></script>
    <script src="/Resource/JSLIB/d3-brush.js"></script>
    <script src="/Resource/JS/PointData.js"></script>
    <script src="/Resource/JS/Pointcloud.js"></script>
    <script src="/Resource/JS/myRect.js"></script>

</head>
<body>
<div class="PointCloudView" style="width: 70%;float: left">

    <div class="brush" style="position: absolute;top:50%;z-index:9999">
        <button id="brush">brush</button>
    </div>
    <!--<input type="file" name="file" id='filea' onchange='aShow()'/>-->
    <div class="progress-bar" id="processBar" style="position: absolute ;z-index : 1000;bottom: 2%">
        <div id="all-progress">
            <div id="current-progress">
                <span id="progress-button"></span>
            </div>
        </div>
    </div>
    <div id="pointcloud3d" style="position: absolute ;"></div>
    <div id="pointcloud2d" style="position: absolute ;"></div>
</div>
<div class="ControlPanel" style="width: 30%;float: right">
    <div class="testswitch" >
        <input class="testswitch-checkbox" id="onoffswitch" type="checkbox">
        <label class="testswitch-label" for="onoffswitch">
            <span class="testswitch-inner" data-on="ON" data-off="OFF"></span>
            <span class="testswitch-switch"></span>
        </label>
    </div>
    <div class="testswitch" >
        <input class="testswitch-checkbox" id="onoffswitch2" type="checkbox">
        <label class="testswitch-label" for="onoffswitch2">
            <span class="testswitch-inner" data-on="3D" data-off="2D"></span>
            <span class="testswitch-switch"></span>
        </label>
    </div>
    <form action="">
        id:<br>
        <input type="text" id="BoxIdInput" value="">
        <br>
        x:<br>
        <input type="text" id="xInput" value="" disabled="disabled">
        <br>
        y:<br>
        <input type="text" id="yInput" value="" disabled="disabled">
        <br>
        l:<br>
        <input type="text" id="lengthInput" value="" disabled="disabled">
        <br>
        w:<br>
        <input type="text" id="widthInput" value="" disabled="disabled">
        <br>

        <br>
        <input type="button" id="submitInput" value="Submit">
        <br>
        <input type="button" id="interpolateInput" value="interpolate">
        <br>
        <input type="button" id="removeInput" value="remove">
    </form>
</div>
</body>
<script src="/Resource/JS/ProcessBar.js"></script>
</html>