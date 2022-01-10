<template>
	<view class="btn-container" :class="[Block]">
		<button
			class="t-btn"
			:lang="lang"
			hover-class=" "
			:loading="loading"
			:disabled="disabled"
			:open-type="openType"
			:session-from="sessionFrom"
			:app-parameter="appParameter"
			:send-message-img="sendMessageImg"
			:send-message-path="sendMessagePath"
			:show-message-card="showMessageCard"
			:send-message-title="sendMessageTitle"
			@click="click"
			@error="error"
			@launchapp="launchapp"
			@getuserinfo="getuserinfo"
			@opensetting="opensetting"
			@getphonenumber="getphonenumber"
			:class="[Color, Rounded, Size, Disabled, Shadow, Ghost, Block]"
		>
			<view class="btn-content">
				<slot />
			</view>
		</button>
	</view>
</template>

<script>
import { $P, $C, Emits, Size, Color, Shadow, Rounded } from '../../core'

/**
 * Btn 按钮
 * @description 按钮组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/base/btn.html
 *
 * @property {Boolean} loading = [true|false] 原生 loading
 * @property {Boolean} ghost = [true|false] 幽灵，默认为false
 * @property {Boolean} light = [true|false] 高亮，默认为false
 * @property {Boolean} block = [true|false] 块级，默认为 false
 * @property {Boolean} outline = [true|false] 轮廓，默认为false
 * @property {Boolean} disabled = [true|false] 禁用，默认为 false
 *
 * @property {String} appParameter 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效，默认为空
 *
 * @property {String} lang = [en|zh_CN|zh_TW] 指定返回用户信息的语言。默认为e英文 (微信小程序)
 *
 * 	@value en 英文
 * 	@value zh_CN 简体中文
 * 	@value zh_TW 繁体中文
 *
 * @property {String} sessionFrom 会话来源，open-type="contact"时有效 (微信小程序)
 *
 * @property {String} sendMessageTitle 会话内消息卡片标题，open-type="contact"时有效(微信小程序)
 *
 * @property {String} sendMessagePath 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效(微信小程序)
 *
 * @property {String} sendMessageImg 会话内消息卡片图片，open-type="contact"时有效(微信小程序)
 *
 * @property {Boolean} showMessageCard = [true|false] 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效，默认为false(微信小程序)
 *
 * @property {String} openType = [feedback|share|getUserInfo|contact|getPhoneNumber|launchApp|openSetting|getAuthorize|contactShare|lifestyle|openGroupProfile] 开放能力
 *
 * 	@value feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志(App、微信小程序、QQ小程序)
 * 	@value share 触发用户转发(微信小程序、百度小程序、支付宝小程序、字节跳动小程序、飞书小程序、QQ小程序、快手小程序)
 * 	@value getUserInfo 获取用户信息，可以从@getuserinfo回调中获取到用户信息(微信小程序、百度小程序、QQ小程序、快手小程序)
 * 	@value contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 @contact 回调中获得具体信息(微信小程序、百度小程序)
 * 	@value getPhoneNumber 获取用户手机号，可以从@getphonenumber回调中获取到用户信息(微信小程序、百度小程序、字节跳动小程序、支付宝小程序、快手小程序。App平台另见一键登陆)
 * 	@value launchApp 小程序中打开APP，可以通过app-parameter属性设定向APP传的参数(微信小程序、QQ小程序)
 * 	@value openSetting 打开授权设置页(微信小程序、百度小程序)
 * 	@value getAuthorize 支持小程序授权(支付宝小程序)
 * 	@value contactShare 分享到通讯录好友(支付宝小程序)
 * 	@value lifestyle 关注生活号(支付宝小程序)
 * 	@value openGroupProfile 呼起QQ群资料卡页面，可以通过group-id属性设定需要打开的群资料卡的群号，同时manifest中必须配置groupIdList(QQ小程序基础库1.4.7版本+)
 *
 * @property {String} shadow = [none|sm|base|md|lg|xl|...] 阴影，默认为 none
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 *
 * @property {String} rounded = [none|sm|base|md|lg|xl|2xl|3xl|full|...] 圆角，默认为 base
 *
 * 	@value none 无
 * 	@value sm 小
 * 	@value base 基础
 * 	@value md 中
 * 	@value lg 大
 * 	@value xl 超大
 * 	@value 2xl 超级大
 * 	@value 3xl 无敌大
 * 	@value full 圆
 *
 * @property {String} color = [primary|secondary|accent|neutral|info|success|warning|error|...] 颜色，默认为 base
 *
 * 	@value primary 主要
 * 	@value secondary 次要
 * 	@value accent 强调
 * 	@value neutral 中和
 * 	@value base 基础
 *
 * 	@value info 信息
 * 	@value success 成功
 * 	@value warning 警告
 * 	@value error 错误
 *
 * @property {String} size = [xs|sm|md|lg|...] 尺寸，默认为 md
 *
 * 	@value xs 超小
 * 	@value sm 小
 *  @value md 中
 * 	@value lg 大
 *
 * @event {Function} click 点击事件
 * @event {Function} error 当使用开放能力时，发生错误的回调(微信小程序)
 * @event {Function} launchapp 从小程序打开 App 成功的回调(微信小程序)
 * @event {Function} opensetting 在打开授权设置页并关闭后回调(微信小程序)
 * @event {Function} getuserinfo 用户点击该按钮时，会返回获取到的用户信息，从返回参数的detail中获取到的值同 uni.getUserInfo (微信小程序)
 * @event {Function} getphonenumber 获取用户手机号回调(微信小程序)
 */
export default {
	name: 't-btn',
	mixins: [
		Shadow(),
		Rounded({ rounded: 'base' }),
		Color({ color: 'base', inject: 'btn' }),
		Size({
			presets: {
				xs: 'h-4 p-2 text-xs', // 超小
				sm: 'h-6 p-3 text-sm', // 小
				md: 'h-8 p-4 text-md', // 中
				lg: 'h-10 p-5 text-lg' // 大
			}
		}),
		Emits(['error', 'launchapp', 'opensetting', 'getuserinfo', 'getphonenumber'])
	],
	emits: ['click'],
	props: $P({
		ghost: false, // 幽灵
		block: false, // 块级
		disabled: false, // 禁用
		openType: '', // 开放能力
		loading: false, // 加载中
		sessionFrom: '', // 会话来源
		lang: 'en', // 指定返回用户信息的语言
		sendMessageImg: '', // 会话内消息卡片图片
		sendMessageTitle: '', // 会话内消息卡片标题
		showMessageCard: false, // 是否显示会话内消息卡片
		appParameter: '', // 打开 APP 时，向 APP 传递的参数
		sendMessagePath: '' // 会话内消息卡片点击跳转小程序路径
	}),
	computed: $C({
		Ghost: 'btn-ghost', // 幽灵
		Block: 'btn-block', // 块级
		Disabled: 'btn-disabled' // 禁用
	}),
	methods: {
		// 点击事件
		click(e) {
			const canClick = !this.disabled
			if (canClick) {
				this.$emit('click', e)
			}
		}
	}
}
</script>

<style scoped lang="less">
@import (reference, less) "../../index.less";
.t-btn {
	.inline-flex;
	.items-center;
	.justify-center;
	box-sizing: border-box;
	transition: all 0.15s ease-in-out;
}

// 去除uniapp原生边框
.t-btn::after {
	border: none;
}

// 缩放动画
.t-btn:active:hover {
	transform: scale(0.85);
}

// 点击激活状态
.btn-active() {
	// 轮廓
	&.btn-outline {
		.text-white;
	}
	// 高亮
	&.btn-light {
		.text-white;
		.bg-opacity-100;
	}
	&.btn {
		// 主要
		&-primary {
			.bg-primary-focus;
		}
		// 次要
		&-secondary {
			.bg-secondary-focus;
		}
		// 强调
		&-accent {
			.bg-accent-focus;
		}
		// 中和
		&-neutral {
			.bg-neutral-focus;
		}
		// 基础
		&-base {
			.bg-base-focus;
		}
		// 信息
		&-info {
			.bg-info-focus;
		}
		// 成功
		&-success {
			.bg-success-focus;
		}
		// 警告
		&-warning {
			.bg-warning-focus;
		}
		// 错误
		&-error {
			.bg-error-focus;
		}
	}
}

// 激活
.t-btn:active {
	.btn-active();
}

// 幽灵激活状态
.btn-ghost-active() {
	.text-currentColor !important;
	background-color: rgba(209, 213, 219, 0.8) !important;
}

// 幽灵
.t-btn.btn-ghost {
	.bg-transparent;
	.text-currentColor;
	&:active {
		.btn-ghost-active();
	}
}

.btn {
	// 容器，消除uni-button的边距
	&-container {
		.inline-block;
	}
	// 内容，消除bg-opacity的影响
	&-content {
		.inline-block;
		.bg-opacity-100;
	}
	// 块级元素
	&-block {
		.w-full;
		.flex;
	}
	// 禁用
	&-disabled {
		.border-transparent;
		color: #acacac !important;
		transform: scale(1) !important;
		background-color: #f7f7f7 !important;
	}
}

/* #ifdef H5 */
@media screen and (min-width: 640px) {
	.t-btn:hover {
		.btn-active();
	}
	.t-btn.btn-ghost:hover {
		.btn-ghost-active();
	}
}
/* #endif */
</style>
