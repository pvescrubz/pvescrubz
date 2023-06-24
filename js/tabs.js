const tabsItem = document.querySelectorAll('.teacher__list__item');
const tabsBtn = document.querySelectorAll('.teachers__btn-tab');



document.querySelector('.teachers__buttons').addEventListener('click', event => {
    if (event.target.tagName !== 'BUTTON') return false;
    let filetrClass = event.target.dataset['path'];
    (filetrClass);
    tabsItem.forEach(elem => {
        elem.classList.remove('hide');
        if (!elem.classList.contains(filetrClass)) {
            elem.classList.add('hide')
        };
    });
});

let window_width = $(window).width();

$(window).resize(function(e) {
    window_width = $(window).width();
    return window_width;
});

tabsBtn.forEach(function(el) {
    el.addEventListener('click', function(e) {
        if (window_width > 576) {
            const path = e.currentTarget.dataset.path;
            tabsBtn.forEach(function(bnt) {
                bnt.classList.remove('teachers__btn-tab--active');
                bnt.classList.remove('hidden')
            });
            e.currentTarget.classList.add('teachers__btn-tab--active');
        }
    });
});


$(document).ready(function() {
    $('.teachers__btn-tab').click(function(e) {
        if ($(window).width() < 576) {
            e.preventDefault();
            $(this).toggleClass("btn-success");
            //$.ajax({
            //url: '@Url.Action("Best", "Posts")',
            //data: { id: this.id }
            //});
            $('.teachers__btn-tab').toggle();
            $(this).toggle()
        } else {
            $('.teachers__btn-tab').show()
        };
    });
});