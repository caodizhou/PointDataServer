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
  <script src="/Resource/JSLIB/pixi.min.js"></script>
  <script src="/Resource/JS/FileRead.js"></script>
  <script src="https://d3js.org/d3-zoom.v1.min.js"></script>
  <script src="/Resource/JS/Data.js"></script>
  <%--<script src="/Resource/JS/PointData.js"></script>--%>
  <script src="/Resource/JS/Pointcloud.js"></script>

</head>
<body>
<div class="testswitch" style="position: absolute;z-index : 1001">
  <input class="testswitch-checkbox" id="onoffswitch" type="checkbox">
  <label class="testswitch-label" for="onoffswitch">
    <span class="testswitch-inner" data-on="ON" data-off="OFF"></span>
    <span class="testswitch-switch"></span>
  </label>
</div>
<div class="brush"  style="position: absolute;top:50%">
  <button id="brush"></button>
</div>
<!--<input type="file" name="file" id='filea' onchange='aShow()'/>-->
<div class="progress-bar" style="position: absolute ;z-index : 1000;bottom: 2%">
  <div id="all-progress">
    <div id="current-progress">
      <span id="progress-button"></span>
    </div>
  </div>
</div>
<div id="pointcloud3d" ></div>
<script src="/Resource/JS/ProcessBar.js"></script>
<script src="/Resource/JS/PointCloudpixi.js"></script>

<!--<script src="/Resource/JS/PointCloud2d.js"></script>-->
</body>
</html>