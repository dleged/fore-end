

<link rel="stylesheet" type="text/css" href="../css/bootstrap.css"/>
<link rel="stylesheet" type="text/css" href="../css/components.css"/>
<link rel="stylesheet" type="text/css" href="../css/propertyList/propertyList.css"/>
<link rel="stylesheet" type="text/css" href="../css/dataTables.bootstrap.css"/>



<div class="property-content">
			<div class="top-condition bd-b-s">
				<span class="head">&nbsp;</span>
				<span class="bacground-li-top">
					<ul>
						<li class="clearBtn">清除</li>
						<li class="searchBtn">查询</li>
					</ul>
				</span>
			</div>
			<div class="top-condition">
				<span class="head">配置项编号：</span>
				<span class="body"><input placeholder="请输入配置项编号"/></span>
			</div>
			<div class="top-condition">
				<span class="head">IP地址：</span>
				<span class="body"><input placeholder="请输入IP地址"/></span>
			</div>
			<div class="top-condition">
				<span class="head">设备类型：</span>
				<span class="body">
					<ul>
						<li>全部</li>
						<li>X86服务器</li>
						<li>刀片机</li>
						<li>小型机</li>
						<li>小型机分区服务器</li>
					</ul>
				</span>
			</div>
			<div class="top-condition pr-50">
				<span class="head">业务名称：</span>
				<span class="background-li">
					<ul>
						<li class="active">全部</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
						<li>业务名称1</li>
					</ul>
					
				</span>
				
				<span class="arrowdown"></span>
			</div>
			<table class="table table-striped table-bordered" id="propertyListTable">
				<thead>
					<tr>
						<th>
							配置项编号
						</th>
						<th>
							设备名称
						</th>
						<th>
							DCN IP
						</th>
						<th>
							其他IP
						</th>
						<th>
							设备生产商
						</th>
						<th>
							设备型号
						</th>
						<th>
							设备序列号
						</th>
						<th>
							生命周期状态
						</th>
						<th>
							所属业务系统
						</th>
						<th>
							运行状态
						</th>
						<th>
							设备评分级别
						</th>
						<th>
							操作
						</th>
					</tr>
				</thead>
			</table>
		</div>
		
<script type="text/javascript" src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/jquery.dataTables.js"></script>
<script type="text/javascript" src="../js/dataTable.js"></script>
<script type="text/javascript" src="../js/dataTables.bootstrap.js"></script>
<script src="../js/assetManage/propertyList.js"></script>