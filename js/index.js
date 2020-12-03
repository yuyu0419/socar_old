window.addEventListener('DOMContentLoaded', function () {


    //메인 마우스휠
    var mouseClear,
        main = document.querySelector('main'),
        indi = document.querySelectorAll('.indigater a'),
        num,
        i = 0,
        count = main.childElementCount,
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
            // indi[i].classList.remove('active');
            if (mEvent.y > mEvent.y2) {
                if (i < count - 1) {
                    i++;
                }
            } else {
                if (i > 0) i--;
            }
            if (i <= count - 2) {
                indi[i].classList.add('active');
            }
            articleMove(e)
            indiActive();
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

    //움직이는 함수에 시간 설정 및 인디게이터 함수 호출
    function setTime(e) {
        clearTimeout(mouseClear);
        mouseClear = setTimeout(function () {
            if (e.type != 'click') {
                indi[i].classList.remove('active');

                if (e.wheelDeltaY < 0 || e.detail > 0) {
                    if (i < count - 1) {
                        i++
                    }
                } else {
                    if (i > 0) { i-- }
                }
                if (i < count - 1) {
                    indi[i].classList.add('active');
                }
            }
            articleMove(e)
            indiActive();
        }, 100, e);
    }

    //main이 움직이는 함수
    // var winH = window.innerHeight
    function articleMove(e) {
        if (i < count - 1) {
            num = window.innerHeight * -i;
        } else {
            num = (window.innerHeight * -(i - 1)) - document.querySelector('footer').offsetHeight;
        }
        var article = main.querySelectorAll('article');
        article.forEach(function (el) {
            el.style = 'height:' + window.innerHeight + 'px';
        })


        setTimeout(function () {
            window.scrollTo(0, 0);
            main.style = "transform:translate(0%," + num + "px);"
        }, 100);
    }

    indi.forEach(function (v, idx) {
        indi[idx].addEventListener('click', indiFun)
    })

    //인디게이터 클릭시 이동
    function indiFun(e) {
        indi[i].classList.remove('active');
        var indiNum = this.dataset.num
        i = indiNum;
        indi[i].classList.add('active');
        indiActive()
        setTime(e)

    }
    //액티브 인디게이터에 스팬이동 함수
    function indiActive() {
        var span = document.querySelector('.indigater span')
        if (indi[i].className == 'active' && i <= count - 1) {
            indi[i].prepend(span)
        }
    }













});//end