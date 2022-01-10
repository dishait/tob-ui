<template>
	<view class="t-sub-menu" @click="click"><slot /></view>
</template>

<script>
import { Emits } from "../../core"

/**
 * SubMenu 子菜单
 * @description 子菜单组件
 * @tutorial https://dishait.gitee.io/tob-ui-doc/components/navigation/menu.html
 *
 * @event {Function} click 点击事件
 */
export default {
	name: 't-sub-menu',
	mixins: [Emits(['click'])]
}
</script>

<style scoped lang="less">
@import (reference, less) '../../index.less';
.t-sub-menu {
	.pl-4;
}
</style>
