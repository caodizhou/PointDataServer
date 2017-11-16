/**
 * Created by cdz on 2017/10/16.
 */

var initProgress = function () {
    music_bar = new scale("#progress-button", "#all-progress", "#current-progress");
};

scale = function (btn, bar, cur_bar, datalenth) {
    this.btn = $(btn);
    this.bar = $(bar);
    this.cur_bar = $(cur_bar);
    this.datalenth = datalenth;
    this.dataindex;
    this.playinterval;
    this.minLength = this.bar.offset().left;
    this.maxLength = this.minLength + this.bar.width();
    this.currentX = this.btn.offset().left;
    this.currentY = this.btn.offset().top;
    this.width;
    this.init();
};

scale.prototype = {
    init: function () {
        this.dataindex = 0;
        var f = this;
        f.cur_bar.css("width", "0%");
        f.currentX = f.minLength;
        var bar = document.getElementById("processBar");
        f.width = $("#processBar").width() / f.datalenth;
        var body = document.getElementsByTagName("body")[0];
        document.getElementById("progress-button").onmousedown = function () {
            body.onmousemove = function (ev) {
                var ev = ev || window.event;
                var p = ev;
                var moveX = p.clientX;
                var distance = moveX - f.currentX;

                console.log("ev:" + ev)
                console.log("moveX:" + moveX)
                console.log("currentX:" + f.currentX)
                console.log("distance:" + distance)
                console.log("width:" + f.width)

                if((distance - f.width >= 0 && f.dataindex < f.datalenth ) || ( f.dataindex == f.datalenth -1 && distance > f.width * 0.9)){
                    f.dataindex++;
                    f.currentX += f.width
                    f.process(f.dataindex , f.datalenth);
                }
                if((distance + f.width <= 0 && f.dataindex > 0) || ( f.dataindex == 1 && f.width * 0.9 <= -distance)){
                    f.dataindex--;
                    f.currentX -= f.width
                    f.process(f.dataindex , f.datalenth);
                }

                // if (Math.abs(moveX - f.currentX) < 100  ) {
                //     if (moveX < f.minLength) {
                //         f.cur_bar.css("width", "0%");
                //         f.currentX = f.minLength;
                //         f.dataindex = 0;
                //     } else if (moveX > f.maxLength) {
                //         f.cur_bar.css("width", "100%");
                //         f.currentX = f.maxLength;
                //         this.dataindex = this.datalenth - 1;
                //     } else {
                //         var percent = ((moveX - f.minLength) ) / (f.maxLength - f.minLength);
                //         var currentX = percent*f.datalenth;
                //         if (currentX - f.dataindex>1)
                //         // f.dataindex = Math.ceil(percent * f.datalenth);
                //         // console.log(moveX+" "+moveY+" "+f.dataindex);
                //         {
                //             console.log("++");
                //             f.dataindex++;
                //             f.process(f.dataindex , f.datalenth);
                //         }
                //         if(currentX - f.dataindex<-1) {
                //             console.log("--");
                //             f.dataindex--;
                //             f.process(f.dataindex , f.datalenth);
                //         }
                //     }
                // }
            };
            function handlesvgmouseon() {
                body.onmousemove = null;
                body.removeEventListener("mouseup",handlesvgmouseon);
            }
            body.addEventListener("mouseup",handlesvgmouseon);
            // bar.onmouseup = function () {
            //     bar.onmousemove = null;
            //     bar.onmouseup = null;
            // };
            return false;
        };

    },
    process: function (index, count) {
        var percent = index / count;
        percent = percent > 1 ? 1 : percent;
        this.currentX = percent * (this.maxLength - this.minLength) + this.minLength;
        this.cur_bar.css("width", percent * 100 + "%");
        this.percent = percent;
    },
    start: function () {
        var f = this;
        // this.playinterval = setInterval(function () {
        //     if ($("#onoffswitch").is(':checked') && f.dataindex < f.datalenth) {
        //         f.dataindex++;
        //         console.log(f.dataindex);
        //         f.process(f.dataindex, f.datalenth);
        //     }
        // }, 1000);
        function clickSwitch() {
            if ($("#onoffswitch").is(':checked')) {
                // d3.selectAll(".pointCloud2d")
                //     .style("visibility", "hidden");
                // d3.selectAll(".pointCloud3d")
                //     .style("visibility", "visible")
                this.playinterval = setInterval(function () {
                    if ($("#onoffswitch").is(':checked') && f.dataindex < f.datalenth) {
                        f.dataindex++;
                        console.log(f.dataindex);
                        f.process(f.dataindex, f.datalenth);
                    }
                    // console.log("hehe");
                }, 1000);
            } else {
                if(this.playinterval){
                    clearInterval(this.playinterval);
                }
                // console.log("haha")
            }
        }
        d3.select("#onoffswitch")
            .on("click", clickSwitch);
    }

};
// var scale_point = new scale("#progress-button","#all-progress","#current-progress",20);
// scale_point.start();
// initProgress();