
var mythis
//隐形矩形的半大
var subRectWidth = 8;
//拖拽后最小边长
var minRectLength = 20;
//每次旋转的角度
var roateSpeed = 10;

//对主体的拖拽操作
var drag = d3.drag()
    .on("drag", dragmove)
    .on("end", dragend)



//移动的时候只需要主体的变化逻辑即可,注意获取坐标
function dragmove(d) {

    var mainWidth = parseInt(d3.select(this).attr("width"))
    var mainHeight = parseInt(d3.select(this).attr("height"))
    var mainId = d3.select(this).attr("id")
    var mainX = d3.event.x - mainWidth / 2
    var mainY = d3.event.y - mainHeight / 2
    var coordinates = [[mainX, mainY], [mainX + mainWidth, mainY], [mainX + mainWidth, mainY + mainHeight], [mainX, mainY + mainHeight]]
    if (d3.event.button == 2) {
        console.log("right")
        var roateAngle = d3.select(this).attr("roateAngle")
        roateAngle += 10;
        console.log(d3.event.button)
        d3.select("#" + mainId).attr('roateAngle', roateAngle)
            .attr('transform', 'rotate(' + roateAngle + ")")
            .attr('transform-origin', d3.select(this).attr('originX') + " " + d3.select(this).attr('originY'))
    }
    else {
        d3.select(this)
            .attr("x", mainX)
            .attr("y", mainY)
            .attr("originX", d3.event.x)
            .attr("originY", d3.event.y)
            .attr('transform-origin', d3.event.x + " " + d3.event.y)
            .property("coordinates", coordinates)
    }
    reLayoutDrag(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}

//结束拖拽后重新布局子矩形
function dragend() {
    var mainId = d3.select(this).attr("id")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainOriginX = mainX + mainWidth / 2
    var mainOriginY = mainY + mainHeight / 2
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    var subRectLeftId = "subRectLeft" + mainId
    var subRectRightId = "subRectRight" + mainId
    var subRectTopId = "subRectTop" + mainId
    var subRectBottomId = "subRectBottom" + mainId
    var subRectLeftTopId = "subRectLeftTop" + mainId
    var subRectRightTopId = "subRectRightTop" + mainId
    var subRectLeftBottomId = "subRectLeftBottom" + mainId
    var subRectRightBottomId = "subRectRightBottom" + mainId

    d3.select("#" + subRectLeftId).attr("x", mainX - subRectWidth)
        .attr("y", mainY)
        .attr("height", mainHeight)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY)
        .attr("height", mainHeight)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectTopId).attr("x", mainX)
        .attr("y", mainY - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectBottomId).attr("x", mainX)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectLeftTopId).attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightTopId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectLeftBottomId).attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + subRectRightBottomId).attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform', 'rotate(' + mainRoateAngle + ")")
        .attr('transform-origin', mainOriginX + " " + mainOriginY)

    d3.select("#" + mainId).attr("originX", mainOriginX)
        .attr("originY", mainOriginY)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    point3d.updateCube()
    point3d.boxControl.boxmap.get(Number(mainId.substr(4))).get(point3d.dataindex).auto = false
}

//子矩形拖拽后的重新布局，与主体拖拽结束后的重新布局区别在于这里不改变旋转中心来保证拖拽方向正常,注意此时改变coordinates的值
function reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth) {


    var mainRoateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    var coordinates = [[mainX, mainY], [mainX + mainWidth, mainY], [mainX + mainWidth, mainY + mainHeight], [mainX, mainY + mainHeight]]
    d3.select("#" + mainId)
        .attr("x", mainX)
        .attr("y", mainY)
        .attr("width", mainWidth)
        .attr("height", mainHeight)
        .property("coordinates", coordinates)

    d3.select("#" + 'subRectTop' + mainId)
        .attr("x", mainX )
        .attr("y", mainY - subRectWidth)
        .attr("width", mainWidth)
    d3.select("#" + 'subRectBottom' + mainId)
        .attr("x", mainX )
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr("width", mainWidth)
    d3.select("#" + 'subRectLeft' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY )
        .attr("height", mainHeight)
    d3.select("#" + 'subRectRight' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY )
        .attr("height", mainHeight)
    d3.select("#" + 'subRectLeftTop' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
    d3.select("#" + 'subRectRightTop' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
    d3.select("#" + 'subRectLeftBottom' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
    d3.select("#" + 'subRectRightBottom' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)


}

function reLayoutDrag(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth) {
    var mainOriginX = mainX + mainWidth / 2
    var mainOriginY = mainY + mainHeight / 2



    var coordinates = [[mainX, mainY], [mainX + mainWidth, mainY], [mainX + mainWidth, mainY + mainHeight], [mainX, mainY + mainHeight]]
    d3.select("#" + mainId)
        .attr("x", mainX)
        .attr("y", mainY)
        .attr("width", mainWidth)
        .attr("height", mainHeight)
        .property("coordinates", coordinates)

    d3.select("#" + 'subRectTop' + mainId)
        .attr("x", mainX )
        .attr("y", mainY - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectBottom' + mainId)
        .attr("x", mainX )
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr("width", mainWidth)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectLeft' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY )
        .attr("height", mainHeight)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectRight' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY )
        .attr("height", mainHeight)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectLeftTop' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY - subRectWidth)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectRightTop' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY - subRectWidth)
    d3.select("#" + 'subRectLeftBottom' + mainId)
        .attr("x", mainX - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)
    d3.select("#" + 'subRectRightBottom' + mainId)
        .attr("x", mainX + mainWidth - subRectWidth)
        .attr("y", mainY + mainHeight - subRectWidth)
        .attr('transform-origin', mainOriginX + " " + mainOriginY)


}


//对左边矩形的拖拽
var subRectLeftDrag = d3.drag()
    .on("drag", subRectLeftDragmove)

function getRotatePoint(x1,y1,x2,y2,r) {
    r = r*Math.PI/180;
    var obj = new Object();
    var cosr = Math.cos(r);
    var sinr = Math.sin(r);
    obj.x = (x2-x1)*cosr-(y2-y1)*sinr+x1;
    obj.y = (x2-x1)*sinr+(y2-y1)*cosr+y1;
    return obj;
}
function subRectLeftDragmove(d) {
    var id = d3.select(this).attr("id")
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (mainX + mainWidth - rotatevent.x > minRectLength) {
        if (rotatevent.x < mainX) {

            mainWidth = mainX - rotatevent.x + mainWidth;
            mainX = rotatevent.x;

        }
        else {
            mainWidth = mainWidth - (rotatevent.x - mainX)
            mainX = rotatevent.x
        }
    }
    // if (mainX + mainWidth - d3.event.x > minRectLength) {
    //     if (d3.event.x < mainX) {
    //
    //         mainWidth = mainX - d3.event.x + mainWidth;
    //         mainX = d3.event.x;
    //
    //     }
    //     else {
    //         mainWidth = mainWidth - (d3.event.x - mainX)
    //         mainX = d3.event.x
    //     }
    // }


    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右边矩形的拖拽
var subRectRightDrag = d3.drag()
    .on("drag", subRectRightDragmove)


function subRectRightDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (rotatevent.x - mainX > minRectLength) {
        if (rotatevent.x < mainX + mainWidth) {
            mainWidth = mainWidth - (mainX + mainWidth - rotatevent.x)

        }
        else {
            mainWidth = mainWidth + (rotatevent.x - mainX - mainWidth)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);

}

//对上边矩形的拖拽
var subRectTopDrag = d3.drag()
    .on("drag", subRectTopDragmove)


function subRectTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (mainY + mainHeight - rotatevent.y > minRectLength) {
        if (rotatevent.y < mainY) {
            mainHeight = mainHeight + (mainY - rotatevent.y)
            mainY = rotatevent.y

        }
        else {
            mainHeight = mainHeight - (rotatevent.y - mainY)
            mainY = rotatevent.y

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}

//对下边矩形的拖拽
var subRectBottomDrag = d3.drag()
    .on("drag", subRectBottomDragmove)


function subRectBottomDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (rotatevent.y - mainY > minRectLength) {
        if (rotatevent.y < mainY + mainHeight) {
            mainHeight = mainHeight - (mainY + mainHeight - rotatevent.y)

        }
        else {
            mainHeight = mainHeight + (rotatevent.y - mainY - mainHeight)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}

//对左上边框的拖拽
var subRectLeftTopDrag = d3.drag()
    .on("drag", subRectLeftTopDragmove)

function subRectLeftTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (mainX + mainWidth - rotatevent.x > minRectLength && mainY + mainHeight - rotatevent.y > minRectLength) {
        if (rotatevent.x < mainX && rotatevent.y < mainY) {
            mainWidth = mainWidth + (mainX - rotatevent.x)
            mainX = rotatevent.x
            mainHeight = mainHeight + (mainY - rotatevent.y)
            mainY = rotatevent.y
        }
        else {
            mainWidth = mainWidth - (rotatevent.x - mainX)
            mainX = rotatevent.x
            mainHeight = mainHeight - (rotatevent.y - mainY)
            mainY = rotatevent.y

        }
    }
    // if (mainX + mainWidth - d3.event.x > minRectLength && mainY + mainHeight - d3.event.y > minRectLength) {
    //     if (event.x < mainX && event.y < mainY) {
    //         mainWidth = mainWidth + (mainX - event.x)
    //         mainX = event.x
    //         mainHeight = mainHeight + (mainY - event.y)
    //         mainY = event.y
    //     }
    //     else {
    //         mainWidth = mainWidth - (event.x - mainX)
    //         mainX = event.x
    //         mainHeight = mainHeight - (event.y - mainY)
    //         mainY = event.y
    //
    //     }
    // }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右上边框的拖拽
var subRectRightTopDrag = d3.drag()
    .on("drag", subRectRightTopDragmove)

function subRectRightTopDragmove(d) {
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    if (rotatevent.x - mainX > minRectLength - subRectWidth && mainY + mainHeight - rotatevent.y > minRectLength - subRectWidth) {
        if (rotatevent.x < mainX + mainWidth && rotatevent.y > mainY) {
            mainWidth = mainWidth - (mainX + mainWidth - rotatevent.x)
            mainHeight = mainHeight - (rotatevent.y - mainY)
            mainY = rotatevent.y
        }
        else {
            mainWidth = mainWidth + (rotatevent.x - mainX - mainWidth)
            mainHeight = mainHeight + (mainY - rotatevent.y)
            mainY = rotatevent.y

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);
}


//对左下边框的拖拽
var subRectLeftBottomDrag = d3.drag()
    .on("drag", subRectLeftBottomDragmove)

function subRectLeftBottomDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);

    d3.select(this)
        .attr("x", rotatevent.x - width / 2)
        .attr("y", rotatevent.y - height / 2)
    if (mainX + mainWidth - rotatevent.x > minRectLength - subRectWidth && rotatevent.y - mainY > minRectLength - subRectWidth) {
        if (rotatevent.x < mainX && rotatevent.y > mainY + mainHeight) {
            mainWidth = mainWidth + (mainX - rotatevent.x)
            mainX = rotatevent.x
            mainHeight = mainHeight + (rotatevent.y - mainY - mainHeight)
        }
        else {
            mainWidth = mainWidth - (rotatevent.x - mainX)
            mainX = rotatevent.x
            mainHeight = mainHeight - (mainY + mainHeight - rotatevent.y)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);


}


//对右边下边框的拖拽
var subRectRightBottomDrag = d3.drag()
    .on("drag", subRectRightBottomDragmove)

function subRectRightBottomDragmove(d) {
    var width = d3.select(this).attr("width")
    var height = d3.select(this).attr("height")
    var mainId = d3.select(this).attr("mainId")
    var mainX = Number(d3.select("#" + mainId).attr("x"))
    var mainY = Number(d3.select("#" + mainId).attr("y"))
    var mainWidth = Number(d3.select("#" + mainId).attr("width"))
    var mainHeight = Number(d3.select("#" + mainId).attr("height"))
    var mainRoateAngle = Number(d3.select("#" + mainId).attr("roateAngle"))
    //防止拖拽过度
    var rotarecenter = d3.select(this).attr("transform-origin").split(" ")
    var rotatevent = getRotatePoint(Number(rotarecenter[0]),Number(rotarecenter[1]),d3.event.x,d3.event.y,-mainRoateAngle);
    d3.select(this)
        .attr("x", rotatevent.x - width / 2)
        .attr("y", rotatevent.y - height / 2)

    if (rotatevent.x - mainX > minRectLength - subRectWidth && rotatevent.y - mainY > minRectLength - subRectWidth) {
        if (rotatevent.x < mainX + mainWidth && rotatevent.y < mainY + mainHeight) {
            mainWidth = mainWidth - (mainX + mainWidth - rotatevent.x)
            mainHeight = mainHeight - (mainY + mainHeight - rotatevent.y)
        }
        else {
            mainWidth = mainWidth + (rotatevent.x - mainX - mainWidth)
            mainHeight = mainHeight + (rotatevent.y - mainY - mainHeight)

        }
    }
    reLayout(mainId, subRectWidth, mainX, mainY, mainHeight, mainWidth);

}

function myRoate(mainId) {
    var roateAngle = parseInt(d3.select("#" + mainId).attr("roateAngle"))
    roateAngle += roateSpeed;
    var idArray = [mainId, "subRectLeft" + mainId, "subRectRight" + mainId, 'subRectTop' + mainId, "subRectBottom" + mainId, "subRectLeftTop" + mainId, "subRectRightTop" + mainId, "subRectLeftBottom" + mainId, "subRectRightBottom" + mainId]
    for (var i = 0; i < idArray.length; i++) {
        d3.select("#" + idArray[i]).attr('roateAngle', roateAngle)
            .attr('transform', 'rotate(' + roateAngle + ")")
            .attr('transform-origin', d3.select("#" + mainId).attr('originX') + " " + d3.select("#" + mainId).attr('originY'))

    }
}

//创建主类
function MyRect(x, y, width, height, id,r,svg) {
    var roateAngle = r;
    var coordinates = [[x, y], [x + width, y], [x + width, y + height], [x, y + height]]
    var ox =  x + width / 2;
    var oy = y + height / 2;
    var rect = svg.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#777")
        .attr("fill-opacity",0.3)
        .attr("stroke","#fff")
        .attr("id", id)
        .attr("class","brushRect")
        .attr("roateFlag", 0)
        .attr('roateAngle', roateAngle)
        .attr("originX", ox)
        .attr("originY",oy)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","move")
        .on("contextmenu", function (d, i) {
            d3.event.preventDefault();
            var mainId = id;
            myRoate(mainId)
            // d3.select("#" + id).attr('roateAngle', roateAngle)
            //     .attr('transform', 'rotate(' + roateAngle + ")")
            //     .attr('transform-origin', d3.select(this).attr('originX') + " " + d3.select(this).attr('originY'))
        })
        .call(drag)
    rect.property("coordinates", coordinates)


    var subRectLeft = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y)
        .attr("width", 2 * subRectWidth)
        .attr("height", height)
        .attr("fill", "transparent")
        .attr("id", "subRectLeft" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","w-resize")
        .call(subRectLeftDrag)

    var subRectRight = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y)
        .attr("width", 2 * subRectWidth)
        .attr("height", height)
        .attr("fill", "red")
        .attr("id", "subRectRight" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","e-resize")
        .style("opacity","0.5")
        .call(subRectRightDrag)

    var subRectTop = svg.append("rect")
        .attr("x", x)
        .attr("y", y - subRectWidth)
        .attr("width", width)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectTop" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","n-resize")
        .call(subRectTopDrag)

    var subRectBottom = svg.append("rect")
        .attr("x", x)
        .attr("y", y + height - subRectWidth)
        .attr("width", width)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectBottom" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","s-resize")
        .call(subRectBottomDrag)

    var subRectLeftTop = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectLeftTop" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","nw-resize")
        .call(subRectLeftTopDrag)

    var subRectRightTop = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectRightTop" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","ne-resize")
        .call(subRectRightTopDrag)

    var subRectLeftBottom = svg.append("rect")
        .attr("x", x - subRectWidth)
        .attr("y", y + height - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectLeftBottom" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","sw-resize")
        .call(subRectLeftBottomDrag)

    var subRectRightBottom = svg.append("rect")
        .attr("x", x + width - subRectWidth)
        .attr("y", y + height - subRectWidth)
        .attr("width", 2 * subRectWidth)
        .attr("height", 2 * subRectWidth)
        .attr("fill", "transparent")
        .attr("id", "subRectRightBottom" + id)
        .attr("mainId", id)
        .attr('transform', 'rotate(' + roateAngle + ")")
        .attr('transform-origin', ox + " " +oy)
        .style("cursor","se-resize")
        .call(subRectRightBottomDrag)


    return rect;

}
var rectmod=["rect","subRectLeftrect","subRectRightrect","subRectToprect","subRectBottomrect","subRectLeftToprect","subRectRightToprect","subRectLeftBottomrect","subRectRightBottomrect"];

function changeRectId(oldId,newId,svg) {
    rectmod.forEach(function (value) {
        svg.select("#"+value+oldId).attr("id",value+newId)
            .attr("mainId","rect"+newId);
    });
}
function deleteRectById(id,svg) {
    rectmod.forEach(function (value) {
        svg.select("#"+value+id).remove();
    });
}
function numMulti(num1, num2) {
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", ""))
        * Number(num2.toString().replace(".", ""))
        / Math.pow(10, baseNum);
};
function numDiv(num1, num2) {
    var baseNum1 = 0, baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    with (Math) {
        baseNum3 = Number(num1.toString().replace(".", ""));
        baseNum4 = Number(num2.toString().replace(".", ""));
        return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
    }
};