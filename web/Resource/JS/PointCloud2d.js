(function () {
    var points;
    init();
    function init() {
        var HEIGHT = window.innerHeight;
        var WIDTH = window.innerWidth;
        var div = d3.select("body").append("div")
            .attr("id", "PointCloud2d");
        var svg = d3.select("div#PointCloud2d").append("svg")
            .style("height", HEIGHT)
            .style("width", WIDTH);
        var x = d3.scale.identity().domain([0, WIDTH]),
            y = d3.scale.identity().domain([0, HEIGHT]);
        // defaultExtent = [[100, 100], [300, 300]],

        var brush = d3.svg.brush()
            .x(x)
            .y(y);
            // .extent(defaultExtent);
            // .on("brush", brushed)
            // .on("brushend", brushended);
        svg.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.event);
        var points = [];
        var dataset = data[1].split(" ");
        var i;
        for (i = 0; i < dataset.length; i += 4) {
            if (i + 4 > dataset.length) {
                break;
            }
            var point = new Object({x: Number(dataset[i]), y: Number(dataset[i + 1]), z: Number(dataset[i + 2]),value:Number(dataset[i+3])});
            points.push(point);
        }
        svg.selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx",function (d) {
                return d.x*8+500;
            })
            .attr("cy",function (d) {
                return d.y*8+200;
            })
            .style("fill","black")
            .attr("r",1);
    }
})();