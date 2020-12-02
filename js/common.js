window.addEventListener('DOMContentLoaded', function () {
    var menuBtn = document.querySelector('.burger'),
        menu = document.querySelector('.menu'),
        info = location.pathname,
        infoS = info.lastIndexOf('/') + 1,
        infoE = info.lastIndexOf('.'),
        infoName = info.slice(infoS, infoE);

    menuBtn.addEventListener('click', function (e) {
        menu.classList.add('active')

        var closeBtn = document.querySelector('.btn')
        closeBtn.addEventListener('click', function () {
            menu.classList.remove('active')
        })
    })

    window.addEventListener('scroll', navFun)
    function navFun() {
        var nav = document.querySelector('.service_nav')
    }


    //information2 컨텐츠 바꾸기
    if (infoName == 'information02') {
        var aBtn = document.querySelectorAll('.img_container a');
        aBtn.forEach(function (a, aIdx) {
            aBtn[aIdx].addEventListener('click', imgChange)
        })
    }

    function imgChange() {
        var imgs = document.querySelectorAll('.mobile img'),
            data = this.dataset.num,
            text = document.querySelectorAll('.description_container p')
        imgs.forEach(function (v, imgI) {
            imgs[imgI].classList.remove('active')
            aBtn[imgI].classList.remove('active')
            text[imgI].classList.remove('active')

            if (data) {
                imgs[data].classList.add('active')
                aBtn[data].classList.add('active')
                text[data].classList.add('active')
            }
        })
    }

});//end
