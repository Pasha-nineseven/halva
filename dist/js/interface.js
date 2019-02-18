$(document).ready(function() {
	flexibility(document.documentElement);

	//top-slider
    if ($('.page-top-slider').length>0) {
        var $top_slider = $('.page-top-slider');
        var time = 3;
        var $bar,
            isPause,
            tick,
            percentTime;
        $top_slider.slick({
            speed: 400,
            touchThreshold: 10,
            pauseOnFocus:false,
            pauseOnHover:false,
            pauseOnDotsHover:false,
            arrows:false,
            //dots:true,
            useTransform:true,
            accessibility: false,
            infinite: true,
            fade: true,
        });

		$top_slider.on('beforeChange', function(event, slick, currentSlide, nextSlide){
			var next = nextSlide; 
		 	$('.page-top-slider-pager__item').removeClass('active');
		 	$('.page-top-slider .slide-' + next + '.page-top-slider-pager__item').addClass('active');
		});
        $bar = $('.page-top-slider-progress');
        function startProgressbar() {
            resetProgressbar();
            percentTime = 0;
            isPause = false;
            tick = setInterval(interval, 30);
        }
        function interval() {
            if (isPause === false) {
                percentTime += 1 / (time + 0.1);
                $bar.css({
                    width: percentTime + "%"
                });
                if (percentTime >= 100) {
                    $top_slider.slick('slickNext');
                    startProgressbar();
                }
            }
        }
        function resetProgressbar() {
            $bar.css({
                width: 0 + '%'
            });
            clearTimeout(tick);
        }

        function pauseProgressbar(){
            $bar.css({
                width: percentTime + "%"
            });
            isPause = true;
        }
        function continueProgressbar() {
            isPause = false;
        }

        startProgressbar();


        //TOP BG CHANGE
        $(".js-bg-change").mouseover(function(e){
            e.preventDefault();
            var bg = $(this).data('bg');
            $(this).parents('.page-top-slider__item').find(".page-top-slider__bg").css('background-image', 'url(' + bg + ')');
            pauseProgressbar()
        });
        $(".js-bg-change").mouseout(function(e){
            e.preventDefault();
            continueProgressbar();
        });
    };


    if ($(".page-form").length>0) {
        $(".page-form-wrap").stick_in_parent({
        	parent :  ".layout " ,
        	offset_top: 20,
        });
    };
    if ($(".page-card").length>0) {
        $(".page-card-wrap").stick_in_parent({
        	parent :  ".layout " ,
        	offset_top: 20,
        });
    };

    //form-mobile-toggle
    $('body').on('click','.js-page-form-mobile-show', function(e){
        e.preventDefault();
        $(this).parents('.page-form-mobile__toggle').hide();
        $('.page-form-mobile').find('.page-form').fadeIn();
    });
    //form-mobile-close
    $('body').on('click','.js-page-form__close', function(e){
        e.preventDefault();
        $('.page-form-mobile__toggle').show();
        $('.page-form-mobile').find('.page-form').fadeOut();
    });

    //page-links-toggle
    $('body').on('click','.js-page-change__link', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('.page-change__list').slideToggle(200);
    });
    $(document).click(function (e){
        var div = $(".page-change");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.js-page-change__link').removeClass('active');
            $('.page-change__list').slideUp(200);
        }
    })
});





$(window).on('scroll', function(){
	activatePoints();


    var target = $('.registration');
    var targetPos = target.offset().top;
    var winHeight = $(window).height();
    var scrollToElem = targetPos - winHeight;
    $(window).scroll(function(){
        var winScrollTop = $(this).scrollTop()-400;
        if(winScrollTop > scrollToElem){
            ///alert(1);
            $('.page-form-mobile').hide();
        }
        else{
            $('.page-form-mobile').show();
        }
    });
});




$(window).resize(function () {

});

// $(window).load(function(){

// });

// functions

function activatePoints(){
	var $scrolled_item = $('.how-steps__item');

	$scrolled_item.each(function(){
		if( $(this).offset().top <= $(window).scrollTop()+$(window).height()/2) {
			$(this).addClass('active');
		}
		else{
			$(this).removeClass('active');
		}
	});
}

// links pages
// $('body').append(
// 	'<div style="position: fixed; z-index: 1005; bottom: 0; right: 0; background: #fff; border: solid 1px #828286; width: 200px;"> \
// 		<a href="javascript:void(0);" style="float: right;background:#ccc; color:#000; padding: 5px 10px; text-decoration: none; font-size: 16px" onclick="$(this).parent().hide()">Close X</a> \
// 	<style> \
// 		#pages { padding: 10px 20px 0 50px; font-size: 18px; } \
// 		#pages a { text-decoration: none; } \
// 		#pages li { margin: 5px 0; } \
// 	</style> \
// 	<ol id="pages"> \
// 		<li><a href="about.html">About</a></li> \
// 		<li><a href="index.html">Index</a></li> \
// 	</ol> \
// </div>');
