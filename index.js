var myClearColorGradient,
    myMillisecond = 1500,
    myNowChanging = false

$(function() {
    fillcolor()
    addColor()
    colorChange($('#display'), [0, 0, 0], [255, 255, 255], myMillisecond)
    setTime()
    $('#colorPanel').find('p').not('.add').on('click', function() {
        colorPanel($(this))
    })
    $('.icon').on('click', function() {
        $('.settingContainer').css('display', 'block').animate({ opacity: '1' })
    })
    $('.closed').on('click', function() {
        $('.settingContainer').css({
            display: 'none',
            opacity: '1'
        })
    })
})

function fillcolor() {
    var color = [
        'white', 'black', 
        'rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)',
        'rgb(255,255,0)', 'rgb(255,0,255)', 'rgb(0,255,255)'
    ]
    $.map(color, function(c) {
        $('<p></p>').css({ backgroundColor: c, color: c }).appendTo('#colorPanel')
    })
    $('.sec').text(myMillisecond)
}

function colorChange(element, [R, G, B], [r, g, b], millisec, fps) {
    myNowChanging = true
    if (myClearColorGradient)
        clearTimeout(myClearColorGradient)
    var freq = (fps) ? fps : 10,
        time = millisec / freq,
        Rmove = (r - R) / time,
        Gmove = (g - G) / time,
        Bmove = (b - B) / time,
        count = 0;
    element.css({ backgroundColor: 'rgb(' + R + ',' + G + ',' + B + ')' })
    _colorChange()

    function _colorChange() {
        R += Rmove
        G += Gmove
        B += Bmove

        element.css({
            backgroundColor: 'rgb(' + Math.round(R) + ',' + Math.round(G) + ',' + Math.round(B) + ')'
        })
        count++
        if (count != time) {
            myClearColorGradient = setTimeout(function() {
                _colorChange()
            }, freq);
        } else {
            myNowChanging = false
            element.css({ backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')' })
        }

    }

}
function colorPanel(target) {
    var rgb = target.css('background-color'),
        arry = rgb.substring(4, rgb.length - 1)
        rgbAry = arry.split(',')
        RGB = $('#display').css('background-color'),
        Arry = RGB.substring(4, RGB.length - 1)
    RGBAry = Arry.split(',')
    $.map(rgbAry, function(ele, i) {
        rgbAry[i] = parseInt(ele)
    })
    $.map(RGBAry, function(ele, i) {
        RGBAry[i] = parseInt(ele)
    })
    console.log(RGBAry)
    colorChange($('#display'), RGBAry, rgbAry, myMillisecond, 5)
}

function setTime() {
    var timeCount = 0,
        interval;
    $('.setTime')
    .on('mousedown touchstart', function() {
        timeCount = 0
        interval = setInterval(function() {
            $('.sec').text(timeCount)
            timeCount += 10
        }, 10)

        
    }).on('mouseup touchend mouseleave',function() {
            clearInterval(interval)
            myMillisecond = timeCount
        })

}

function addColor() {
    $('#display').on('click', function() {
        if (myNowChanging) {
            var rgb = $(this).css('background-color'),
                arry = rgb.substring(4, rgb.length - 1)

            console.log(arry)
            rgbAry = arry.split(',')
            $('<p></p>').css({
                backgroundColor: 'rgba(' + rgbAry[0] + ',' + rgbAry[1] + ',' + rgbAry[2] + ')',
                color: 'rgba(' + rgbAry[0] + ',' + rgbAry[1] + ',' + rgbAry[2] + ')'
            }).on('click', function() {
                colorPanel($(this))
            }).appendTo('#colorPanel')
        }

    })
}
