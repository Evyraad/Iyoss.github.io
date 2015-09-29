(function ($) {
    $(document).ready(function () {
        //search menu hide and show --------------------------------------------
        $('.hide-elem').hide();
        $('#search-form').on('click', function () {
            if ((!$("#search-menu").is(":visible")) && ($('#search-menu').attr('data-show') == 'false')) {
                $('#search-menu').show(600);
                $('#search-form').attr('placeholder', '');
                $('#search-menu').attr('data-show', "true");
            }
        });
        $('.search--menu--elem').on('click', function () {
            $('#search-menu').attr('data-show', "false");
            $('#search-form').attr('placeholder', $(this).attr('data-value'));
            $('#search-menu').hide(600);
        });
        $('#search-form').focusout(function () {
            $('#search-menu').attr('data-show', "false");
            $('#search-menu').hide(600);
        });
        //form sine in --------------------------------------------
        $('#sineIn').click(function () {
            $('.form--pass-recoverty').fadeOut(500);
            if ($('.form--sineIn').is(':visible')) {
                $('.form--sineIn').fadeOut(500);
            } else {
                $('.form--sineIn').fadeIn(500);
            }
            return false;
        });
        $('.form--sineIn').click(function (e) {
            e.stopPropagation();
        });
        $(document).click(function () {
            $('.home-header .form--sineIn').fadeOut(500);
        });
        $(document).click(function () {
            $('.container--content__about-us .form--sineIn').fadeIn(500);
        });
        $(document).click(function () {
            $('.container--content__contacts .form--sineIn').fadeIn(500);
        });
        //form recovery password --------------------------------------------
        $('#password-recovery').click(function () {
            if ($('.form--pass-recoverty').is(':visible')) {
                $('.form--pass-recoverty').fadeOut(500);
            } else {
                $('.form--sineIn').fadeOut(500);
                $('.form--pass-recoverty').fadeIn(500);
            }
            return false;
        });
        $('.form--pass-recoverty').click(function (e) {
            e.stopPropagation();
        });
        $(document).click(function () {
            $('.form--pass-recoverty').fadeOut(500);
        });
        //carousel-home --------------------------------------------
        // Initialization of animated caption
        var intervalCarousel = 5000;
        var $auctionCarousel = $('#auctionCarousel');

        $auctionCarousel.carousel({interval: intervalCarousel});
        $auctionCarousel.carousel('pause');

        function  toInitPosition(elem) {
            var h = $auctionCarousel.height() + elem.height() + 200;
            return h;
        };

        var $carouselCap = $auctionCarousel.find('.item:first').find('.carousel-caption'),
                $allcarouselCap = $auctionCarousel.find('.carousel-caption'),
                initPosition = toInitPosition($carouselCap);

        $allcarouselCap.animate({top: initPosition}, function () {
            $carouselCap.show();
            $carouselCap.animate({top: 0}, 'slow');
        });

        // Start changing slide
        $auctionCarousel.on('slide.bs.carousel', function () {
            initPosition = toInitPosition($carouselCap);
            $carouselCap.animate({top: -530}, 'slow', function () {
                $(this).hide();
                $(this).animate({top: initPosition});
            });
        });
        // End changing slide
        $auctionCarousel.on('slid.bs.carousel', function (e) {
            $carouselCap = $(e.relatedTarget).find('.carousel-caption');
            $carouselCap.show();
            $carouselCap.animate({top: 0}, 'slow');
        });
//---------------------------------------------------------------------------------------------------------
        var $imgElements = $auctionCarousel.find('.item .img-carousel');
        function formBackground(elems) {
            elems.each(function () {
                var $this = $(this),
                        elemImgScr = 'url("' + $this.attr('src') + '")';
                $this.css({'opacity': '0'});
                $this.parent().css({
                    'background': 'transparent ' + elemImgScr + ' no-repeat center',
                    'background-size': '100%',
                    'background-position': ' left top'});
            });
        }
        formBackground($imgElements);

        $(window).on('load resize', function () {
            var heightWindow = $(window).innerHeight() - $('.container-fluid--header').height() - $('.gold-line').height() - 1;
            $('#auctionCarousel').height(heightWindow);
        });
        //catalog --------------------------------------------
        var $firstBookFocus = $('.catalog--one-book').first(),
                activeBook = $firstBookFocus.find('.book--info').find('.info-img'),
                $parentBookFocus,
                $previewBookFocus = $('.content--preview'),
                bookFocusParam = ['img', 'book--autor', 'book--title', 'book--publish-year', 'book--price', 'book--read-more'];

        $firstBookFocus.find('.book--info').find('.info-img').addClass('catalog--book-focus');
        updatePreviewBook($firstBookFocus, $previewBookFocus, bookFocusParam);

        $('.content--catalog .info-img').click(function () {
            var $this = $(this);
            if (activeBook) {
                activeBook.removeClass('catalog--book-focus');
            }
            $this.addClass('catalog--book-focus');
            activeBook = $this;

            $parentBookFocus = $this.parents('.catalog--one-book');
            updatePreviewBook($parentBookFocus, $previewBookFocus, bookFocusParam);
            commas.removeCommas('.content--preview');
        });

        var activPaginateLink = $('.paginate-active');
        $('.paginate').click(function () {
            if (activPaginateLink) {
                activPaginateLink.removeClass('paginate-active');
            }
            $(this).addClass('paginate-active');
            activPaginateLink = $(this);
        });

        function operationCommas(array) {
            this.array = array;
        }
        operationCommas.prototype.addCommas = function (parent) {
            this.array.forEach(function (item, i, arr) {
                $(parent + ' ' + item).append('<span class="addCommas">, </span>');
            });
        };
        operationCommas.prototype.removeCommas = function (parent) {
            $(parent + ' ' + '.addCommas').remove();
        };

        var commas = new operationCommas(['.book--autor', '.book--circulation', '.book--press']);

        $('.icon-list').click(function (event) {
            if ($(event.target).is('.glyphicon-th')) {
                $('.glyphicon-th-list').removeClass('list--elem__active');
                $('.glyphicon-th').addClass('list--elem__active');
                $('.catalog--body').removeClass('catalog--body__list');
                $('.catalog--body').addClass('catalog--body__tile');
                commas.removeCommas('.container--content__catalog');
            } else {
                $('.glyphicon-th').removeClass('list--elem__active');
                $('.glyphicon-th-list').addClass('list--elem__active');
                $('.catalog--body').removeClass('catalog--body__tile');
                $('.catalog--body').addClass('catalog--body__list');
                commas.addCommas('.catalog--body__list');
            }
        });

        function updatePreviewBook(parentParam, previewParam, updateParam) {
            updateParam.forEach(function (item, i, arr) {
                if (item == 'img') {
                    previewParam.find(item).attr('src', parentParam.find(item).attr('src'));
                } else if (item == 'book--read-more') {
                    previewParam.find('.' + item).find('.elem--a').attr('href', parentParam.find('.' + item).find('.elem--a').attr('href'));
                } else {
                    previewParam.find('.' + item).html(parentParam.find('.' + item).html());
                }
            });
        }
        
        $('#sticky-sidebar').affix({
            offset:{
                top: 119
            }
        });
        //lot --------------------------------------------
        $('#carousel-one-lot').carousel({interval: 0});

        //datetimepicker --------------------------------------------
        moment.locale('ru', {
            months: "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split("_"),
            monthsShort: "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split("_"),
            weekdays: "понедельник_вторник_среда_четверг_пятница_суббота_воскресенье".split("_"),
            weekdaysShort: "пн._вт._ср._чт._пт._сб._вс.".split("_"),
            weekdaysMin: "Пн_Вт_Ср_Чт_Пт_Сб_Вс".split("_"),
            ordinalParse: /\d{1,2}(er|ème)/,
            ordinal: function (number) {
                return number + (number === 1 ? 'er' : 'ème');
            },
            meridiemParse: /PD|MD/,
            isPM: function (input) {
                return input.charAt(0) === 'M';
            },
            meridiem: function (hours, minutes, isLower) {
                return hours < 12 ? 'PD' : 'MD';
            },
            week: {
                dow: 1, // Monday is the first day of the week.
                doy: 4  // The week that contains Jan 4th is the first week of the year.
            }
        });
        $('#datetimepicker').datetimepicker({
            format: 'DD. MM. YYYY',
            locale: 'ru'
        });
        //calendar --------------------------------------------
        var $calendarElems = $('.calendar--month .month--list').find('.list--elem');
        var pastMonths = $calendarElems.length - 12;
        function hidePastMonths(hideMonths, months) {
            var arr = months;
            if (hideMonths <= 0)
                return;
            for (var i = 0; i < hideMonths; i++) {
                $(arr[i]).remove();
            }
        }
        hidePastMonths(pastMonths, $calendarElems);

        var newData = new Date(),
                dateToday = newData.getMonth();
        $calendarElems = $('.calendar--month .month--list').find('.list--elem');
        $calendarElems.each(function (indx, elem) {
            if ($(elem).attr("data-month") == dateToday) {
                $(elem).addClass("active-month");
            }
        });

        var $activeMonth = $('.active-month');
        $('.month--list .list--elem').click(function () {
            if ($activeMonth) {
                $activeMonth.removeClass('active-month');
            }
            $(this).addClass('active-month');
            $activeMonth = $(this);
        });
    });
}(jQuery));

$(document).ready(function () {
    $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none'

    });

});
