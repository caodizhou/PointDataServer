pointCloud2d = function (data, container, scale) {
    this.data = data;
    this.dataindex = 0;
    this.container = container;
    this.scale = scale;
    this.box;
}

pointCloud2d.prototype = {
    drawPointCloud2d: function () {
        var data = this.data;
        var canvasContainer = this.container;
        var container = d3.select(this.container);
        var scale = this.scale;
        var brushmode = false;
        var HEIGHT, WIDTH,dataindex = scale.dataindex
            ,graphics,containerpixi;
        init();
        function init() {
            HEIGHT = window.innerHeight;
            WIDTH = window.innerWidth*0.7;
            // var graphicsset = generategraphics(data);
            var containerset = test(data);
            var svg = container.append("svg")
                .style("width", WIDTH)
                .style("height", HEIGHT)
                .style("position", "absolute")
                .attr("class", "pointCloud2d");
            var pixiCanvas = container
                .append("canvas")
                .attr("id", 'pixiCanvas')
                .attr("class", "pointCloud2d");
            var renderer = PIXI.autoDetectRenderer(WIDTH, HEIGHT, {
                backgroundColor: 0xffffff,
                antialias: true, view: pixiCanvas.node()
            });
            canvasContainer.appendChild(renderer.view);
            var stage = new PIXI.Container();

            svg.call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom));
            function zoom() {
                if (!brushmode) {
                    // d3.select(".brush").remove();
                    var transform = d3.zoomTransform(this);
                    graphics.position.x = transform.x;
                    graphics.position.y = transform.y;
                    graphics.scale.x = transform.k;
                    graphics.scale.y = transform.k;
                }

            }

            d3.select("button#brush")
                .on("click", function () {
                    brushmode = !brushmode;
                    if (brushmode) {
                        svg.append("g")
                            .attr("class", "brush")
                            .call(brush);
                    }
                    else {
                        d3.selectAll("g.brush").remove();
                    }
                })
            // graphics =
            // graphics = graphicsset[0];
            var containerpixi = containerset[0];
            //  graphics = new PIXI.Graphics();

            // graphics.beginFill(0xe74c3c); // Red
            // graphics.drawCircle(200,200,50);
            // var dataset = data[dataindex];
            // var particleCount = dataset.length;
            // for (var i = 0; i < particleCount; i++) {
            //     graphics.drawCircle(dataset[i].x * 5 + 500, dataset[i].y * 5 + 250, 1);
            // }
            // stage.addChild(graphics);
            stage.addChild(containerpixi);
            animate();
            function animate() {
                render();
                renderer.render(stage);
                // if ($("#onoffswitch").is(':checked')) {
                //     return;
                // }
                //Render the stage
                requestAnimationFrame(animate);
            }

            function render() {
                if (dataindex != scale.dataindex) {
                    /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
                    // var dataset = data[(dataindex) % data.length];
                  // var  particleCount = dataset.length;
                    /* Leagues under the sea */

                    /*	Hope you took your motion sickness pills;
                     We're about to get loopy.	*/

                    // var graphics = new PIXI.Graphics();
                    // graphics.beginFill(0xe74c3c); // Red                    graphics = new graphics
                    // for (i = 0; i < particleCount; i++) {
                    //     graphics.drawCircle(dataset[i].x * 5 + 500, dataset[i].y * 5 + 250, 1);
                    // }
                    // graphics = graphicsset[dataindex];
                    containerpixi = containerset[dataindex];
                    stage.removeChildren();
                    stage.addChild(containerpixi);
                    // time = now;
                    dataindex = scale.dataindex;
                }

            }
            defaultExtent = [[0, 0], [WIDTH, HEIGHT]];
            function my_filter() {
                return brushmode;
            };
            var brush = d3.brush()
                .filter(my_filter)
                .extent(defaultExtent)
                .on("end", function () {
                    console.log(d3.event.selection)
                });
        }
        // function generategraphics(data) {
        //     var graphicsset = [];
        //     for(var i =0;i<data.length;i++){
        //         var graphics = new PIXI.Graphics();
        //         graphics.beginFill(0xe74c3c); // Red                    graphics = new graphics
        //         var datalength = data[i].length;
        //         for(var j=0;j<datalength;j++){
        //             graphics.drawCircle(data[i][j].x * 5 + 500, data[i][j].y * 5 + 250, 1);
        //         }
        //         graphicsset.push(graphics);
        //     }
        //     return graphicsset;
        
        function test(data) {
            var circle = new PIXI.Graphics();
            circle.beginFill(0xff0000);
            circle.drawCircle(0,0,1);
            var texture = circle.generateTexture(1, PIXI.SCALE_MODES.DEFAULT);
            var containerset = [];
                for(var i =0;i<data.length;i++){
                    var datalength = data[i].length;
                   var container = new PIXI.ParticleContainer();
                    container._maxSize = 1000000;

                    for(var j=0;j<datalength;j++){
                        var sprite = new PIXI.Sprite(texture);
                        sprite.x = data[i][j].x * 5 + 500;
                        sprite.y = data[i][j].y * 5 + 250;
                        container.addChild(sprite);
                        // graphics.drawCircle(data[i][j].x * 5 + 500, data[i][j].y * 5 + 250, 1);
                    }
                    containerset.push(container);
                }
                return containerset;
        }
    }
}
// (function () {
//     var width = 960,
//         height = 500;
//     var brushmode = false;
//     var svg = d3.select("body")
//         .append("svg")
//         .style("width", 960)
//         .style("height", 500)
//         .style("position", "absolute")
//         .attr("class", "pointCloud2d");
//     var pixiCanvas = d3.select("body")
//         .append("canvas")
//         .attr("id", 'pixiCanvas')
//         .attr("class", "pointCloud2d");
//
//     var renderer = PIXI.autoDetectRenderer(width, height, {
//         backgroundColor: 0xffffff,
//         antialias: true, view: pixiCanvas.node()
//     });
//
//     var stage = new PIXI.Container();
//     // pixiCanvas.call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
//     svg.call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom));
//     function zoom() {
//         if (!brushmode) {
//             // d3.select(".brush").remove();
//             var transform = d3.zoomTransform(this);
//             graphics.position.x = transform.x;
//             graphics.position.y = transform.y;
//             graphics.scale.x = transform.k;
//             graphics.scale.y = transform.k;
//         }
//
//     }
//
//     document.body.appendChild(renderer.view); // 連結至網頁
//
//     d3.select("button#brush")
//         .on("click", function () {
//             console.log("wahaha");
//             brushmode = !brushmode;
//             if (brushmode) {
//                 svg.append("g")
//                     .attr("class", "brush")
//                     .call(brush);
//             }
//             else {
//                 d3.selectAll("g.brush").remove();
//             }
//         })
//     var graphics = new PIXI.Graphics();
//     graphics.beginFill(0xe74c3c); // Red
//
//     // stage.addChild(graphics);  // 要將 Graphics 物件加到 Stage 中
//     // graphics.beginFill(0xff0000); // 設定我們要畫的顏色
//     // for(var i=0;i<10000;i++) {
//     //     graphics.drawRect(Math.random()*900,Math.random()*400,3,3); // 隨機決定位置
//     // }
//     // renderer.render(stage);
//     // var rect = new PIXI.Graphics();
//     // rect.beginFill(0xff0000);
//     // rect.drawRect(0, 0, 3, 3);
//     // var texture = rect.generateTexture(3 * 3, PIXI.SCALE_MODES.DEFAULT);
//     // var container = new PIXI.ParticleContainer();
//     // stage.addChild(container);
//     var points = [];
//     var dataset = data[1].split(" ");
//     var i;
//     for (i = 0; i < dataset.length; i += 4) {
//         if (i + 4 > dataset.length) {
//             break;
//         }
//         var point = new Object({
//             x: Number(dataset[i]),
//             y: Number(dataset[i + 1]),
//             z: Number(dataset[i + 2]),
//             value: Number(dataset[i + 3])
//         });
//         points.push(point);
//     }
//     for (var i = 0; i < points.length; i++) {
//         graphics.drawCircle(points[i].x * 5 + 500, points[i].y * 5 + 250, 1);
//     }
//     stage.addChild(graphics);
//     // renderer.render(stage);
//     animate();
//     function animate() {
//         //Render the stage
//         requestAnimationFrame(animate);
//         if ($("#onoffswitch").is(':checked')) {
//             return;
//         }
//         renderer.render(stage);
//     }
//
//
//     defaultExtent = [[0, 0], [width, height]];
//
//     function my_filter() {
//         return brushmode;
//     };
//     var brush = d3.brush()
//         .filter(my_filter)
//         .extent(defaultExtent)
//         .on("end", function () {
//             console.log(d3.event.selection)
//         });
//
//     // .filter(filter);
//     // .extent(defaultExtent);
//     // .on("brush", brushed)
//     // .on("brushend", brushended);
//
// })()