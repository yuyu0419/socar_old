window.addEventListener('DOMContentLoaded', function () {

    window.addEventListener('scroll', navFun)
    function navFun() {
        var header = document.querySelector('header'),
            sY = window.scrollY;

        if (sY >= header.offsetHeight) {
            header.classList.add('active')
        } else {
            header.classList.remove('active')
        }
    }

    if (location.pathname == '/pairing2.html') {
        var owner = document.querySelector('.owner')
        owner.addEventListener('click', paring)

        function paring() {
            alert('오너신청이 마감되었습니다.')
        }
    }



});//end
