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
    this.minLength = this.bar.offset().left;
    this.maxLength = this.minLength + this.bar.width();
    this.currentX = this.btn.offset().left;
    this.currentY = this.btn.offset().top;
    this.init();
};

scale.prototype = {
    init: function () {
        this.dataindex = 0;
        var f = this;
        f.cur_bar.css("width", "0%");
        f.currentX = f.minLength;
        document.getElementById("progress-button").onmousedown = function () {
            document.onmousemove = function (ev) {
                var ev = ev || window.event;

                var p = ev;
                var moveX = p.clientX;
                var moveY = p.clientY;
                if ((Math.abs(moveX - f.currentX) < 100) && (Math.abs(moveY - f.currentY) < 20 )) {
                    if (moveX < f.minLength) {
                        f.cur_bar.css("width", "0%");
                        f.currentX = f.minLength;
                        f.dataindex = 0;
                    } else if (moveX > f.maxLength) {
                        f.cur_bar.css("width", "100%");
                        f.currentX = f.maxLength;
                        this.dataindex = this.datalenth - 1;
                    } else {
                        var percent = ((moveX - f.minLength) ) / (f.maxLength - f.minLength);
                        var currentX = percent*f.datalenth;
                        if (currentX - f.dataindex>1)
                        // f.dataindex = Math.ceil(percent * f.datalenth);
                        // console.log(moveX+" "+moveY+" "+f.dataindex);
                        {
                            f.dataindex++;
                            f.process(f.dataindex , f.datalenth);
                        }
                        if(currentX - f.dataindex<-1) {
                            f.dataindex--;
                            f.process(f.dataindex , f.datalenth);
                        }
                    }
                }

            };
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouseup = null;
            };
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
        setInterval(function () {
            if ($("#onoffswitch").is(':checked') && f.dataindex < f.datalenth) {
                f.dataindex++;
                console.log(f.dataindex);
                f.process(f.dataindex, f.datalenth);
            }
        }, 1000)
    }

};
// var scale_point = new scale("#progress-button","#all-progress","#current-progress",20);
// scale_point.start();
// initProgress();