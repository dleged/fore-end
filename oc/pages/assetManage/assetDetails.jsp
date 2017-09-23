<link rel="stylesheet" type="text/css" href="../css/swiper.css"/>
<style type="text/css">
	.swiper-container {
        width: 100%;
        padding-top: 30px;
        padding-bottom: 50px;
    }
	.swiper-slide{
		height: 400px;
	}
</style>
<div class="container2">
	<div class="pd-10">
		<div class="box-boder" style="height: 405px;">
			<div class="col-md-2 h100 div-right-line">
				
			</div>
			<div class="col-md-8 h100">
				
			</div>
			<div class="col-md-2 h100 div-left-line">
				
			</div>
		</div>
	</div>
	<div class="pd-10 pd-t-0">
		<div class="box-boder" style="height: 467px;">
			<div class="swiper-container">
			    <div class="swiper-wrapper">
			        <div class="swiper-slide" style="background: #f66;">Slide 1</div>
			        <div class="swiper-slide" style="background: #6f6;">Slide 2</div>
			        <div class="swiper-slide" style="background: #66f;">Slide 3</div>
			        <div class="swiper-slide" style="background: #f6f;">Slide 4</div>
			        <div class="swiper-slide" style="background: #6ff;">Slide 5</div>
			    </div>
			    <!-- 如果需要分页器 -->
			    <div class="swiper-pagination"></div>
			</div>
		</div>
	</div>
</div>
<script src="../js/swiper.min.js" type="text/javascript" charset="utf-8"></script>
<script type="text/javascript">
	setTimeout(function(){
		var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        effect: 'coverflow',
	        grabCursor: true,
	        centeredSlides: true,
	        slidesPerView: '1. ',
	        coverflow: {
	            rotate: 40,
	            stretch: 120,
	            depth: 100,
	            modifier: 1,
	            slideShadows : true
	        }
	    });
	},10)
</script>
