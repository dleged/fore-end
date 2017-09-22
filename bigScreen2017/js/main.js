(function(){
	var main = main || {},
		Map = {};
	/*显示坐标的经纬度集合*/
	Map.geoCoordMap = {
		    '深圳': [108.400504, 22.810731],
		    '美国': [-101.543212, 38.297327],
		    '香港': [114.190838, 22.259745],
		    '巴西': [-50.942436, -11.807860],
		    '澳大利亚': [134.496303, -26.221547],
		    '台湾省': [121.022363, 23.721319],
		    '加拿大': [-107.327894, 62.740586],
		    '智利': [-70.357353, -26.963456],
		    '杭州': [120.19,30.26	]
		};
	Map.style = {
		backgroundColor: '#073449',
	}
	Map.Eles = {
		zjEchart: document.querySelector('.zj-echart'),
		worldEchart: document.querySelector('.world-echart')
	}
	
	Map._create = function(ele,options){
		return new chartApplication(ele,options);
	}
	Map._formtGCData = function(geoData, data, srcNam, dest) {
	    var tGeoDt = [];
	    if (dest) {
	        for (var i = 0, len = data.length; i < len; i++) {
	            if (srcNam != data[i].name) {
	                tGeoDt.push({
	                    coords: [geoData[srcNam], geoData[data[i].name]]
	                });
	            }
	        }
	    } else {
	        for (var i = 0, len = data.length; i < len; i++) {
	            if (srcNam != data[i].name) {
	                tGeoDt.push({
	                    coords: [geoData[data[i].name], geoData[srcNam]]
	                });
	            }
	        }
	    }
	    return tGeoDt;
	}
	Map._formtVData = function(geoData, data, srcNam) {
		    var tGeoDt = [];
		    for (var i = 0, len = data.length; i < len; i++) {
		        var tNam = data[i].name
		        if (srcNam != tNam) {
		            tGeoDt.push({
		                name: tNam,
		                value: geoData[tNam],
		                symbolSize: 10,
		                itemStyle: {
		                    normal: {
		                        color: '#FFD24D',
		                        borderColor: 'gold'
		                    }
		                }
		            });
		        }
		    }
		    tGeoDt.push({
		        name: srcNam,
		        value: geoData[srcNam],
		        symbolSize: 8,
		        itemStyle: {
		            normal: {
		                color: '#4DFFFF',
		                borderColor: '#fff'
		            }
		        }
		    });
		    return tGeoDt;
		},
	Map._changeData = function(){
	}
	Map._initMap = function(){
	}
	
	//世界地图
	!function(){
		var jzMap = 'world',
			ele = Map.Eles['worldEchart'],
			startPoints = [{
		    		name: '深圳',
				}, {
				    name: '美国',
				}, {
				    name: '香港',
				}, {
				    name: '巴西',
				},  {
				    name: '澳大利亚',
				}, {
				    name: '台湾省',
				}, {
				    name: '杭州',
				}, {
				    name: '加拿大',
				}, {
				    name: '智利',
			}],
			linesData = Map._formtGCData(Map.geoCoordMap,startPoints,'杭州'),
			pointsData	= Map._formtVData(Map.geoCoordMap,startPoints,'杭州');
			zjOptions = {
			    backgroundColor: Map.style.backgroundColor,
			    geo: {
			        type: 'map',
			        map: jzMap,
			        roam: true,
			        label: {
			            emphasis: {
			                show: false
			            }
			        },
			        itemStyle: {
			            normal: {
			                shadowBlur: 10,
			                borderWidth: 1,
			                shadowColor: 'rgba(0, 255, 191,0.4)',
			                areaColor: '#002d42',
			                borderColor: '#00ffbf'
			            },
			            emphasis: {
			                areaColor: '#002d42',
			            }
			        }
			    },
			    series: [{
			        type: 'lines',//线
			        zlevel: 2,//图层位置
			        effect: {
			            show: true,
			            period: 6,//攻击速度
			            trailLength: 0.1,//阴影长度
			            color: '#aba911',//攻击颜色
			            symbol: 'arrow',//攻击样式
			            symbolSize: 5//攻击大小
			        },
			        lineStyle: {
			            normal: {
			                color: '#aba911',//轨道颜色
			                width: 0,//轨道宽度
			                opacity: 0.2,//轨道透明度
			                curveness: -0.2//轨道曲线
			            }
			        },
			        data: linesData
			    }, {
			        type: 'effectScatter',//点效果
			        effectType: 'ripple',
			        coordinateSystem: 'geo',
			        symbolSize: 1,
			        zlevel: 2,
			        /*rippleEffect: {
			            period: 3,
			            scale: 5,
			            brushType: 'stroke',
			        },*/
			        label: {//标注名称
			            normal: {
			                show: true,
			                position: 'right',
			                formatter: '{b}'
			            }
			        },
			        symbolSize: 1,
			        itemStyle: {
			            normal: {
			                color: '#fff',
			                borderColor: 'gold'
			            }
			        },
			        data: pointsData
			    }]
			};
			var	myChart = echarts.init(ele);
			myChart.setOption(zjOptions);
	}()
	
	//浙江热力地图
	!function(){
		function showProvince() {
		    // myChart.showLoading();
		    var ele = Map.Eles['zjEchart'],
		   		myChart = echarts.init(ele),
			   	option = {
			   		backgroundColor: Map.style.backgroundColor,
			        title: {
			           /* text: "浙江省",
			            textStyle: {
							color: 'white',
							lineHeight: '60px',
						},*/
			            left: 'center'
			        },
			        visualMap: {
			            min: 0,
			            max: 100,
			            right: '3%',
			            bottom: '3%',
			            text: ['高', '低'], // 文本，默认为数值文本
			            calculable: true,
			            textStyle: {
							color: 'white'
						},
			            inRange: {
			                color: ['#29d89e', '#02a073'],
			                symbolSize: [100, 100]
			            },
			        },
			        series: [{
			            type: 'map',
			            mapType: name,
			            label: {
			                normal: {
			                    color: '#333',
			                    show: true
			                },
			                emphasis: {
		                     	color: '#fff',
			                    show: true
			                }
			            },
			            itemStyle: {
			                normal: {
			                    borderColor: '#000',
			                    borderWidth: 0,
			                    borderType: 'solid',
			                    shadowBlur: 10,
			                    shadowColor:  '#073449',
			                    shadowOffsetX: 0,
			                    shadowOffsetY: 10,
			                    opacity: 1,
			                },
			                emphasis: {
			                    areaColor: '#02a373',
			                    borderWidth: 0
			                }
			            },
			            animation: false,
			            data: [{
			                name: '杭州',
			                value: 100
			            }, {
			                name: '宁波',
			                value: 10
			            }, {
			                name: '温州',
			                value: 20
			            }, {
			                name: '绍兴',
			                value: 30
			            }, {
			                name: '湖州',
			                value: 40
			            }, {
			                name: '嘉兴',
			                value: 41
			            }, {
			                name: '金华',
			                value: 15
			            }, {
			                name: '衢州',
			                value: 25
			            }, {
			                name: '舟山',
			                value: 35
			            }, {
			                name: '台州',
			                value: 35
			            }, {
			                name: '丽水',
			                value: 35
			        }]
			       }]     
			    }
		    $.get('../js/mapChart/zhejiang.json', function(geoJson) {
		        // myChart.hideLoading();
		        echarts.registerMap(name, geoJson);
		        myChart.setOption(option);
		    });
		}
		showProvince();
	}()
	
	//初始化滚动列表
	!function(){
		var $scrollBox = $('.scroll-box');
		$scrollBox.scrollTop({
		  speed: 100 //数值越大 速度越慢
		});
	}()
/*	mainInitAll = function(){
		this.initList = [];
	}
	mainInitAll.prototype.addFn = function(fn){
		this.initList.push(fn);
	}
	mainInitAll.prototype.runFns = function(){
		
	}
	var initAll = new mainInitAll();
	
*/	
	
})()
