/**
 * Created by cdz on 2017/10/27.
 */
brush = function (container) {
    this.container = container;
    this.selection;
}
brush.prototype={
    init:function () {
        
    },
    creatBrush:function () {
        function redraw() {
            var group = select(this),
                selection = group.property("selection");

            if (selection) {
                group.selectAll(".selection")
                    .style("display", null)
                    .attr("x", selection[0][0])
                    .attr("y", selection[0][1])
                    .attr("width", selection[1][0] - selection[0][0])
                    .attr("height", selection[1][1] - selection[0][1]);

                group.selectAll(".handle")
                    .style("display", null)
                    .attr("x", function(d) { return d.type[d.type.length - 1] === "e" ? selection[1][0] - handleSize / 2 : selection[0][0] - handleSize / 2; })
                    .attr("y", function(d) { return d.type[0] === "s" ? selection[1][1] - handleSize / 2 : selection[0][1] - handleSize / 2; })
                    .attr("width", function(d) { return d.type === "n" || d.type === "s" ? selection[1][0] - selection[0][0] + handleSize : handleSize; })
                    .attr("height", function(d) { return d.type === "e" || d.type === "w" ? selection[1][1] - selection[0][1] + handleSize : handleSize; });
                if(group.select(".selection").attr("rotate")){
                    group.selectAll(".selection,.handle")
                        .attr("transform","rotate("+group.select(".selection").attr("rotate")+","+(selection[0][0]+selection[1][0])/2+" "+(selection[0][1]+selection[1][1])/2+")");
                }
            }

            else {
                group.selectAll(".selection2d,.rect2d")
                    .style("display", "none")
                    .attr("x", null)
                    .attr("y", null)
                    .attr("width", null)
                    .attr("height", null);
            }
        };
        var cursors = {
            overlay: "crosshair",
            selection: "move",
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        };
        var svg = this.container;
    }
}