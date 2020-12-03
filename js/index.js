window.addEventListener('DOMContentLoaded', function () {


    //메인 마우스휠
    var mouseClear,
        main = document.querySelector('main'),
        indi = document.querySelectorAll('.indigater a'),
        num,
        i = 0,
        count = main.childElementCount,
        mql = window.matchMedia("screen and (max-width: 1023px)"),
        resMsg, idx;

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

        // var article = main.querySelectorAll('article');
        // article.forEach(function (el) {
        //     el.style = 'height:' + window.innerHeight + 'px';
        // })

        if (Math.abs(mEvent.y - mEvent.y2) > 100) {
            if (mEvent.y > mEvent.y2) {
                if (i < count - 1) {
                    idx = i
                    i++
                    if (i <= count - 2) {
                        indi[idx].classList.remove('active');
                    }
                }
            } else {
                if (i > 0) {
                    idx = i
                    i--;
                    if (i <= count - 1) {
                        indi[idx].classList.remove('active');
                    }
                }
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
        // if (resMsg == 'mobile') {
        setTimeout(function () {
            document.querySelector('body').style = "height:" + parseInt(document.documentElement.clientHeight + 5) + "px";
            setTimeout(scrollTo, 0, 0, 1);
        }, 500);
        // }
        clearTimeout(mouseClear);
        mouseClear = setTimeout(function () {
            if (e.type != 'click') {
                if (e.wheelDeltaY < 0 || e.detail > 0) {
                    if (i < count - 1) {
                        idx = i
                        i++
                        if (i <= count - 2) {
                            indi[idx].classList.remove('active');
                        }
                        // console.log(idx)
                    }
                } else {
                    if (i > 0) {
                        idx = i
                        i--;
                        if (i <= count - 1) {
                            indi[idx].classList.remove('active');
                            console.log(idx)
                            console.log(i)
                        }
                    }
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
    function articleMove(e) {
        if (i < count - 1) {
            num = window.innerHeight * -i;
        } else {
            num = (window.innerHeight * -(i - 1)) - document.querySelector('footer').offsetHeight;
        }
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
        if (i <= count - 2) {
            if (indi[i].className == 'active') {
                indi[i].prepend(span)
            }
        }
    }













});//end