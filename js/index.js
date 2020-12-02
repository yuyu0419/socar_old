window.addEventListener('DOMContentLoaded', function () {


    //메인 마우스휠
    var mouseClear,
        main = document.querySelector('main'),
        indi = document.querySelectorAll('.indigater a'),
        num,
        i = 0,
        count = main.childElementCount,
        span = document.createElement('span'),
        mql = window.matchMedia("screen and (max-width: 1023px)"),
        resMsg;

    //모바일 or PC 구분
    mql.addListener(res);
    function res(e) {
        if (e.matches) {
            //모바일
            resMsg = 'mobile';
        } else {
            //PC
            resMsg = 'pc';
        }
        setTime(e)
    }
    res(mql);

    var mEvent = { y: 0, y2: 0, state: '' };

    window.addEventListener('touchstart', tStart);
    window.addEventListener('touchmove', tMove);
    window.addEventListener('touchend', tEnd);

    function tStart(e) {
        mEvent.y = e.changedTouches[0].clientY;
    }
    function tMove(e) {
        mEvent.y2 = e.changedTouches[0].clientY;
    }
    function tEnd(e) {
        mEvent.y2 = e.changedTouches[0].clientY;

        if (Math.abs(mEvent.y - mEvent.y2) > 100) {
            if (mEvent.y > mEvent.y2) {
                if (i < count - 1) i++;
            } else {
                if (i > 0) i--;
            }
            articleMove(e)
        }
    }

    //Edge, chrome
    window.addEventListener('mousewheel', function (e) {
        setTime(e)
    });

    //firefox
    window.addEventListener('DOMMouseScroll', function (e) {
        setTime(e)
    });

    function setTime(e) {
        clearTimeout(mouseClear);
        mouseClear = setTimeout(function () {
            if (e.type != 'click') {
                if (e.wheelDeltaY < 0 || e.detail > 0) {
                    if (i < count - 1) {
                        i++
                    }
                } else {
                    if (i > 0) { i-- }
                }
            }
            // indi[i].classList.remove('active')
            articleMove()
            indi[i].classList.add('active')
            indiActive();
        }, 100, e);
    }

    indi.forEach(function (v, idx) {
        indi[idx].addEventListener('click', indiFun)
    })

    function indiFun(e) {
        var indiNum = this.dataset.num
        i = indiNum;
        setTime(e)
    }

    function indiActive() {
        var s = document.querySelector('.indigater span')

        if (indi[i].className == 'active' && i <= count - 1) {
            indi[i].prepend(s)
        }
    }

    var winH = window.innerHeight
    function articleMove(e) {
        if (i < count - 1) {
            num = winH * -i;
        } else {
            num = (winH * -(i - 1)) - document.querySelector('footer').offsetHeight;
        }
        main.style = "transform:translate(0%," + num + "px);"
        setTimeout(function () { window.scrollTo(0, 0); }, 100);
    }











});//end