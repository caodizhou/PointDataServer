(function () {
    var width = 960,
        height = 500;
    var brushmode = false;
    var svg = d3.select("body")
        .append("svg")
        .style("width", 960)
        .style("height", 500)
        .style("position", "absolute");
    var pixiCanvas = d3.select("body")
        .append("canvas")
        .attr("id", '#pixiCanvas');

    var renderer = PIXI.autoDetectRenderer(width, height, {
        backgroundColor: 0xffffff,
        antialias: true, view: pixiCanvas.node()
    });

    var stage = new PIXI.Container();
    // pixiCanvas.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
    svg.call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom));
    function zoom() {
        if (!brushmode) {
            // d3.select(".brush").remove();
            var transform = d3.zoomTransform(this);
            graphics.position.x = transform.x;
            graphics.position.y =transform.y;
            graphics.scale.x = transform.k;
            graphics.scale.y = transform.k;
        }

    }

    document.body.appendChild(renderer.view); // 連結至網頁

    d3.select("button#brush")
        .on("click",function () {
            console.log("wahaha");
            brushmode = !brushmode;
        })
    var graphics = new PIXI.Graphics();
    graphics.beginFill(0xe74c3c); // Red

    // stage.addChild(graphics);  // 要將 Graphics 物件加到 Stage 中
    // graphics.beginFill(0xff0000); // 設定我們要畫的顏色
    // for(var i=0;i<10000;i++) {
    //     graphics.drawRect(Math.random()*900,Math.random()*400,3,3); // 隨機決定位置
    // }
    // renderer.render(stage);
    // var rect = new PIXI.Graphics();
    // rect.beginFill(0xff0000);
    // rect.drawRect(0, 0, 3, 3);
    // var texture = rect.generateTexture(3 * 3, PIXI.SCALE_MODES.DEFAULT);
    // var container = new PIXI.ParticleContainer();
    // stage.addChild(container);
    var points = [];
    var dataset = data[1].split(" ");
    var i;
    for (i = 0; i < dataset.length; i += 4) {
        if (i + 4 > dataset.length) {
            break;
        }
        var point = new Object({
            x: Number(dataset[i]),
            y: Number(dataset[i + 1]),
            z: Number(dataset[i + 2]),
            value: Number(dataset[i + 3])
        });
        points.push(point);
    }
    for (var i = 0; i < points.length; i++) {
        graphics.drawCircle(points[i].x * 5 + 500, points[i].y * 5 + 250, 1);
    }
    stage.addChild(graphics);
    // renderer.render(stage);
    animate();
    function animate() {
        //Render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }


    // defaultExtent = [[100, 100], [300, 300]],

    function filter() {
        return brushmode;
    }
    var brush = d3.brush()
        .filter(filter);

        // .filter(filter);
    // .extent(defaultExtent);
    // .on("brush", brushed)
    // .on("brushend", brushended);
    svg.append("g")
        .attr("class", "brush")
        .call(brush)
})()