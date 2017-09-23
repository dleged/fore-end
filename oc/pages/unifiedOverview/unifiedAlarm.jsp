	<div class="container1">
		<div class="col-md-7 pd-r-5 h-370">
			<div class="box-boder m-b-10" style="height: 184px;">
				<div class="box-title">
					<span>当前告警统计</span>
				</div>
				<div class="box-page">
					<div class="">
						<div class="col-md-3 line-right">
							<span class="unif-data">123654</span>
							<span class="unif-text"><img src="../images/icon04.png"/>主机类告警</span>
						</div>
						<div class="col-md-3 line-right">
							<span class="unif-data">123654</span>
							<span class="unif-text"><img src="../images/icon03.png"/>数通类告警</span>
						</div>
						<div class="col-md-3 line-right">
							<span class="unif-data">123654</span>
							<span class="unif-text"><img src="../images/icon01.png"/>存储类告警</span>
						</div>
						<div class="col-md-3 line-right">
							<span class="unif-data">123654</span>
							<span class="unif-text"><img src="../images/icon02.png"/>数据库类告警</span>
						</div>
					</div>
					<div class="unif-bottom">
						<div class="col-md-4 pd-0 bg-red">
							<span>一级告警</span>
							<span>365</span>
						</div>
						<div class="col-md-4 pd-0 bg-yellow">
							<span>二级告警</span>
							<span>365</span>
						</div>
						<div class="col-md-4 pd-0 bg-blur">
							<span>三级告警</span>
							<span>365</span>
						</div>
					</div>
				</div>
				
			</div>
			<div class="box-boder" style="height: 176px;">
				<div class="box-title">
					<span>月告警统计</span>
				</div>
				<div class="box-legend-line">
					<span class="active be-red" onclick="line1(1)">一级告警</span>
					<span class="be-yellow" onclick="line1(2)">二级告警</span>
					<span class="be-blur" onclick="line1(3)">三级告警</span>
				</div>
				<div class="box-page">
					<div id="main1" style="width: 100%;height: 100%;">
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-5 pd-l-5">
			<div class="h-370 box-boder">
				<div class="box-title">
					<span>TOP5告警</span>
				</div>
				<div class="box-tab-a">
					<span class="active" onclick="pictorialBar(1)">主机</span>
					<span onclick="pictorialBar(2)">存储</span>
					<span onclick="pictorialBar(3)">数据库</span>
					<span onclick="pictorialBar(4)">数通设备</span>
				</div>
				<div class="box-page">
					<div id="main2" style="width: 100%;height: 100%;">
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-12 pd-t-0">
			<div class="h-370 box-boder">
				<div class="box-title">
					<span>监控能力统计</span>
				</div>
				<div class="box-legend-bar">
					<span class="be-blur">接入率</span>
					<span class="be-red">有效性</span>
					<span class="be-green">延迟</span>
					<span class="be-yellow">漏告警</span>
				</div>
				<div class="box-tab-a">
					<span class="active" onclick="barChart1(1)">主机</span>
					<span onclick="barChart1(2)">存储</span>
					<span onclick="barChart1(3)">数据库</span>
					<span onclick="barChart1(4)">数通设备</span>
				</div>
				<div class="box-page">
					<div id="main3" style="width: 100%;height: 100%;">
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-7 pd-t-0 pd-r-5">
			<div class="h-370 box-boder">
				<div class="box-title">
					<span>告警来源统计</span>
				</div>
				<div class="box-page">
					<div id="main4" style="width: 100%;height: 100%;">
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-5 pd-t-0 pd-l-5">
			<div class="h-370 box-boder">
				<div class="box-title box-title-select">
					<span>主机硬件告警趋势图</span>
					<div class="title-select">
						<span onclick="line2(1)">主机硬件告警趋势图</span>
						<span onclick="line2(2)">主机硬件告警趋势图</span>
					</div>
				</div>
				<div class="box-legend-line">
					<span class="active be-red" onclick="line2(1)">一级告警</span>
					<span class="be-yellow" onclick="line2(2)">二级告警</span>
					<span class="be-blur" onclick="line2(3)">三级告警</span>
				</div>
				<div class="box-page">
					<div id="main5" style="width: 100%;height: 100%;">
					</div>
				</div>
			</div>
		</div>
	</div>
	<script src="../js/echarts.js" type="text/javascript" charset="utf-8"></script>
	<script type="text/javascript">
		//barChart();
		line1(1);
		line2(1);
		pictorialBar(1);
		barChart1(1);
		barChart2();
		function line1(type){
			var xdata = ["1","2","3","4","5","6","7","8","9","10","11","12"];
			var data,color;
			if(type == 1){
				data = [100, 200, 300, 60, 400, 30, 50, 100, 60, 30 ,40, 100];
				color = '#ff7979';
			}else if(type == 2){
				data = [100, 20, 30, 60, 50, 10, 90, 90, 20, 40 ,60, 70];
				color = '#ffb054';
			}else if(type == 3){
				data = [10, 20, 80, 60, 50, 70, 90, 40, 20, 80 ,60, 30];
				color = '#4ec3ff';
			}
			
			var series = [];
			var obj = {
	                name: '数量',
	                type: 'line',
	                symbol:"circle",
	                symbolSize:7,
	                //smooth: true,
	                data: data,
	                //data:data,
	                itemStyle:{
	                	normal:{
	                		color:color
	                	},
	                },
	            }
			series.push(obj);
			Chart('main1',xdata,series)
		}
		function pictorialBar(type){
			var xdata,data
			if(type == 1){
				xdata = ["10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233"];
				data = [123, 60, 25, 18, 12];
			}else if(type == 2){
				xdata = ["10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233"];
				data = [123, 80, 75, 58, 12];
			}else if(type == 3){
				xdata = ["10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233"];
				data = [123, 100, 55, 18, 12];
			}else if(type == 4){
				xdata = ["10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233","10.12.134.233"];
				data = [123, 60, 55, 48, 32];
			}
			var series = [];
			var obj = {
			        name: 'top5告警',
			        type: 'pictorialBar',
			        barCategoryGap: '-130%',
			        //symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
			        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
			        itemStyle: {
			            normal: {
			            	opacity: 0.8,
			            	color:{
							    type: 'linear',
							    x: 0,
							    y: 0,
							    x2: 0,
							    y2: 1,
							    colorStops: [{
							        offset: 0, color: 'rgba(255,130,130,1)' // 0% 处的颜色
							    }, {
							        offset: 1, color: 'rgba(255,130,130,0.3)' // 100% 处的颜色
							    }],
							    globalCoord: false // 缺省为 false
							},
						},	
			            emphasis: {
			                opacity: 1,
			            }
			        },
			        data: data,
			        z: 10
			    };
			series.push(obj);
			Chart('main2',xdata,series)
		}
		function barChart1(type){
			var xdata,data;
			if(type == 1){
				xdata = ['主机事件监控', '主机事件监控事件', '主机性能监控', '主机宕机监控', 'X86硬件监控', '12000硬件监控'];
				data = [
					[10, 52, 20, 34, 90, 30],
					[10, 52, 20, 34, 90, 30],
					[10, 52, 20, 34, 90, 30],
					[10, 52, 20, 34, 90, 30]
				];
			}else if(type == 2){
				xdata = ['主机事件监控', '主机事件监控事件', '主机性能监控', '主机宕机监控', 'X86硬件监控', '12000硬件监控'];
				data = [
					[15, 52, 20, 74, 90, 20],
					[10, 62, 60, 54, 20, 80],
					[70, 42, 30, 34, 60, 30],
					[40, 52, 20, 44, 20, 50]
				];
			}else if(type == 3){
				xdata = ['主机事件监控', '主机事件监控事件', '主机性能监控', '主机宕机监控', 'X86硬件监控', '12000硬件监控'];
				data = [
					[15, 52, 30, 34, 90, 30],
					[10, 82, 60, 54, 50, 80],
					[40, 72, 70, 84, 90, 30],
					[40, 22, 20, 74, 20, 60]
				];
			}else if(type == 4){
				xdata = ['主机事件监控', '主机事件监控事件', '主机性能监控', '主机宕机监控', 'X86硬件监控', '12000硬件监控'];
				data = [
					[15, 52, 20, 34, 90, 30],
					[10, 72, 60, 54, 20, 80],
					[70, 42, 40, 24, 90, 30],
					[40, 52, 20, 74, 20, 50]
				];
			}
			
			var name = ['接入率','有效性','延迟','漏告警'];
			var series = [];
			for(var i = 0; i < 4; i++){
				series.push({
					name:name[i],
		            type:'bar',
		            barWidth: 18,
		            itemStyle:{
		            	normal:{
		            		barBorderRadius:18
		            	}
		            },
		            data:data[i]
				});
			}
			var ymax = 100;
			var formatter = '{value}%';
			var formatter1 =  '{b}<br />{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br />{a3}: {c3}%';
			Chart('main3',xdata,series,formatter,ymax,formatter1);
		}
		function barChart2(){
			var xdata = ['主机监控', '数通监控', 'X86服务器监控', '12000硬件监控', '存储监控', 'GC监控','DBMON监控','ZIBBX监控'];
			var series = [];
			series.push({
				name:'告警数',
	            type:'bar',
	            barWidth: 18,
	            itemStyle:{
	            	normal:{
	            		barBorderRadius:24
	            	}
	            },
	            data:[28000,18000,34000,23000,12000,15000,24000,11000]
			});
			var formatter = function (value) {
			    if(value >= 1000){
			    	return (value/1000)+'k';
			    }
			}
			Chart('main4',xdata,series,formatter);
		}
		function line2(type){
			var data;
			if(type == 1){
				data = [100, 200, 300, 60, 400, 30, 50];
			}else if(type == 2){
				data = [100, 20, 50, 60, 40, 30, 50];
			}else if(type == 3){
				data = [100, 30, 35, 60, 40, 30, 80];
			}
			var xdata = ["8/28","8/29","8/30","8/31","9/1","9/2","9/3"];
			var series = [];
			var obj = {
	                name: '数量',
	                type: 'line',
	                symbol:"circle",
	                symbolSize:7,
	                //smooth: true,
	                data: data,
	                //data:data,
	                itemStyle:{
	                	normal:{
	                		color:"#ff7979"
	                	},
	                },
	            }
			series.push(obj);
			Chart('main5',xdata,series)
		}
		
		function Chart(id,xdata,series,formatter,ymax,formatter1){
			var myChart = echarts.init(document.getElementById(id));
	        // 指定图表的配置项和数据
	        var option = {
	        	color:[
					new echarts.graphic.LinearGradient(
		                0, 0, 0, 1,
		                [
		                    {offset: 0, color: 'rgba(121,177,254,1)'},
		                    {offset: 1, color: 'rgba(121,177,254,0.2)'}
		                ]
		            ),
		            new echarts.graphic.LinearGradient(
		                0, 0, 0, 1,
		                [
		                    {offset: 0, color: 'rgba(255,143,143,1)'},                   
		                    {offset: 1, color: 'rgba(255,143,143,0.2)'}
		                ]
		            ),
		            new echarts.graphic.LinearGradient(
		                0, 0, 0, 1,
		                [
		                    {offset: 0, color: 'rgba(53,217,178,1)'},
		                    {offset: 1, color: 'rgba(53,217,178,0.2)'}
		                ]
		            ),
		            new echarts.graphic.LinearGradient(
		                0, 0, 0, 1,
		                [
		                    {offset: 0, color: 'rgba(255,185,118,1)'},
		                    {offset: 1, color: 'rgba(255,185,118,0.2)'}
		                ]
		            ),
				],
	            tooltip : {
			        trigger: 'axis',
			        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
			            type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
			        },
			        formatter:formatter1
			    },
	            grid:{
	            	top:20,
	            	left:60,
	            	right:30,
	            	bottom:30
	            },
	            xAxis: {
	                data: xdata,
	                //data:name,
	                axisTick:{
	            		show:false
	            	},
	            	axisLine:{
	            		lineStyle:{
	            			color:"#ececec"
	            		}
	            	},
	            	axisLabel: {
			            textStyle: {
			                color: '#333'
			            }
			        },
	            },
	            yAxis: {
	            	axisLine:{
	            		show:false,
	            		textStyle:{
	            			color:"#333",
	            		}
	            	},
	            	 splitLine: {
			            lineStyle: {
			                color: '#ececec'
			            }
			        },
	            	axisTick:{
	            		show:false
	            	},
	            	axisLabel:{
						formatter: formatter,
					},
	            	max:ymax,
	            	//minInterval: 100
	            },
	            series: series
	        };
	        myChart.setOption(option);
		}
		
		
		$(document).on("click",".box-legend-line span",function(){
			$(this).addClass("active").siblings().removeClass("active");
		})
		$(document).on("click",".box-tab-a span",function(){
			$(this).addClass("active").siblings().removeClass("active");
		})
		
		$(document).on("click",".box-title-select",function(){
			$(this).toggleClass("active");
		})
		$(document).on("click",".title-select span",function(event){
			$(this).parents(".box-title-select").removeClass("active");
			event.stopPropagation();
		})
		
	</script>
