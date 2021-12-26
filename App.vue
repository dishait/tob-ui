<script>
export default {
	onLaunch() {
		console.log('App Launch')
	},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	}
}
</script>

<style lang="less">
@import '@/uni_modules/tob-ui/index.less';

// 自定义的位置(popup)
.custom-popup-close-position {
	top: 10rpx;
	left: 10rpx;
}

// fallback字体
// https://juejin.cn/post/7005056135279427614#heading-9
page {
	font-family: 'PingFang SC', 'Helvetica Neue', Helvetica, v, sans-serif;
}

// pc端web滚动条
/* #ifdef H5 */
::-webkit-scrollbar {
	width: 0;
}

@media screen and (min-width: 640px) {
	::-webkit-scrollbar {
		width: 11px;
		height: 11px;
		background-color: rgb(246, 247, 248);
	}
	
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: rgb(217, 217, 217);
	}
	
	::-webkit-scrollbar-track {
		border-radius: 10px;
		background-color: rgb(246, 247, 248);
	}
}
/* #endif */
</style>
