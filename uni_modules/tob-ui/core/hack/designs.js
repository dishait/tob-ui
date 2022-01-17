import Flex from '../design/flex.js'
import Size from '../design/size.js'
import Color from '../design/color.js'
import Emits from '../design/emits.js'
import Shadow from '../design/shadow.js'
import VModel from '../design/VModel.js'
import { createHack } from './common.js'
import Rounded from '../design/rounded.js'
import { is, not } from '../tools/types.js'

import {
	InjectEffects,
	ProvideEffects
} from '../design/effects.js'
import {
	InjectCounter,
	ProvideCounter
} from '../design/counter.js'

const hasDefaultValueArray = [
	'flex',
	'size',
	'color',
	'shadow',
	'rounded'
]

const logic = (k, v, newSchema) => {
	const isOpen = k === 'open' && is('Array', v)
	if (isOpen) {
		return simplifyOpen(v, newSchema)
	}

	const design = useDesign(k)

	const set = nv => (newSchema[k] = design(nv))

	const isVModel = k === 'vModel'
	if (isVModel) {
		return set({ value: v })
	}

	const isBoo = is('Boolean', v)
	if (isBoo) {
		return set()
	}

	const isStr = is('String', v)
	const notCompose = !/^(inject)|(provide)/.test(k)
	const shouldNesting = isStr && notCompose

	if (shouldNesting) {
		return set({ [k]: v })
	}

	formatDefaultConfig(k, v)

	set(v)
}

const hack = createHack(logic)

export default v => Object.values(hack(v))

// 简化开启
const simplifyOpen = (v, newSchema) => {
	v.forEach(nk => {
		if (hasDefaultValueArray.includes(nk)) {
			logic(nk, true, newSchema)
		}
	})
}

const designs = {
	size: Size,
	color: Color,
	emits: Emits,
	flex: Flex,
	shadow: Shadow,
	vModel: VModel,
	rounded: Rounded,
	injectEffects: InjectEffects,
	injectCounter: InjectCounter,
	provideEffects: ProvideEffects,
	provideCounter: ProvideCounter
}
// 使用设计
const useDesign = k => {
	const design = designs[k]
	const unknownDesign = is('Undefined', design)
	if (unknownDesign) {
		throw new Error(`该design - ${k} 不存在`)
	}
	return design
}

// 格式化默认配置
const formatDefaultConfig = (k, v) => {
	const isObj = is('Object', v)
	const hasDefault = not('Undefined', v['default'])
	const shouldFormat = isObj && hasDefault
	if (shouldFormat) {
		v[k] = v['default']
		delete v['default']
	}
}
