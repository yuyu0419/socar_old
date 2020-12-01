window.addEventListener('DOMContentLoaded', function () {


    //메인 마우스휠
    var mouseClear,
        main = document.querySelector('main'),
        indi = document.querySelectorAll('.indigater a'),
        num,
        i = 0,
        count = main.childElementCount,
        span = document.createElement('span');

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
            indi[i].classList.remove('active')
            if (e.wheelDeltaY < 0 || e.detail > 0) {
                if (i < count - 1) {
                    i++
                }
            } else {
                if (i > 0) { i-- }
            }
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
        setTime(e)
        if (indiNum) {
            indiActive()
        }
    }

    function indiActive() {
        var s = document.querySelector('.indigater a:nth-of-type(1) span')

        if (indi[i].className == 'active') {
            if (i <= count - 1) {
                console.log(i)
                indi[i].prepend(span)
                indi[0].removeChild(s)
            }
        } else {
            indi[i].prepend('')
        }
    }


    function articleMove(e) {
        if (i < count - 1) {
            num = window.innerHeight * -i;
        } else {
            num = (window.innerHeight * -(i - 1)) - document.querySelector('footer').offsetHeight;
        }
        main.style = "transform:translate(0%," + num + "px);"

        setTimeout(function () { window.scrollTo(0, 0); }, 100);
    }











});//end