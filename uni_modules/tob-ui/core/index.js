// 工具库
import $T from './tools/index.js'

//  hack
import $P from './hack/props.js'
import $M from './hack/methods.js'
import $C from './hack/computed.js'

// design
import Size from './design/size.js'
import Shadow from './design/shadow.js'
import VModel from './design/VModel.js'
import Rounded from './design/rounded.js'
import Flex from './design/flex.js'
import Color, { bgColorPresets, textColorPresets, borderColorPresets, createColorPresets } from './design/color.js'

import { ProvideEffects, InjectEffects } from './design/effects.js'

import { ProvideCounter, InjectCounter } from './design/counter.js'

import Emits from './design/emits.js'

export {
	$T, // 工具库
	$P, // props生成器
	$M, // methods生成器
	$C, // computed生成器
	Size, // 尺寸系统
	Color, // 颜色系统
	Emits, // 暴露事件
	Shadow, // 阴影系统
	Rounded, // 圆角系统
	Flex, // flex布局系统
	VModel, // vModel 系统
	InjectEffects, // 注入effects依赖
	ProvideEffects, // 提高effects依赖
	InjectCounter, // 注入计数器依赖
	ProvideCounter, // 提供计数器依赖
	bgColorPresets, // 背景颜色预设
	textColorPresets, // 文本颜色预设
	createColorPresets, // 创建颜色预设
	borderColorPresets, // 边框颜色预设
}
