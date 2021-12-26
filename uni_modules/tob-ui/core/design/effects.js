import { not, is } from '../tools/types.js'

// 提供effects依赖
export const ProvideEffects = (name) => {
	if (not('String', name)) {
		throw new Error('effect的依赖配置必须包含name且类型为字符串')
	}

	return {
		data() {
			return {
				effects: new Map()
			}
		},
		provide() {
			return {
				[`${name}HasEffect`]: this.hasEffect, // 存在
				[`${name}ShowEffect`]: this.showEffect, // 获取
				[`${name}SizeEffects`]: this.sizeEffects, // 数量
				[`${name}TrackEffect`]: this.trackEffect, // 收集
				[`${name}ClearEffects`]: this.clearEffects, // 清理
				[`${name}DestoryEffect`]: this.destoryEffect, // 销毁
				[`${name}TriggerEffect`]: this.triggerEffect, // 触发
				[`${name}TriggerAllEffect`]: this.triggerAllEffect, // 触发所有
			}
		},
		methods: {
			// 存在
			hasEffect(k) {
				return this.effects.has(k)
			},
			// 获取
			showEffect(k) {
				return this.effects.get(k)
			},
			// 数量
			sizeEffects() {
				return this.effects.size
			},
			// 收集
			trackEffect(k, effect) {
				return this.effects.set(k, effect)
			},
			// 清理
			clearEffects() {
				return this.effects.clear()
			},
			// 触发
			triggerEffect(k, v) {
				const effect = this.effects.get(k)
				if (is('Function', effect)) {
					return effect(v)
				}
				return null
			},
			// 销毁
			destoryEffect(k) {
				return this.effects.delete(k)
			},
			// 触发所有
			triggerAllEffect(v) {
				this.effects.forEach((effect) => {
					if (is('Function', effect)) {
						effect(v)
					}
				})
			},
		},
	}
}

// 注入effects依赖
export const InjectEffects = (name) => {
	if (not('String', name)) {
		throw new Error('effect的注入配置必须包含name且类型为字符串')
	}

	return {
		inject: {
			// 是否有
			[`${name}HasEffect`]: {
				default: () => { },
			},
			// 获取
			[`${name}ShowEffect`]: {
				default: () => { },
			},
			// 数量
			[`${name}SizeEffect`]: {
				default: () => { },
			},
			// 收集
			[`${name}TrackEffect`]: {
				default: () => { },
			},
			// 清理
			[`${name}ClearEffects`]: {
				default: () => { },
			},
			// 销毁
			[`${name}DestoryEffect`]: {
				default: () => { },
			},
			// 触发
			[`${name}TriggerEffect`]: {
				default: () => { },
			},
			// 触发所有
			[`${name}TriggerAllEffect`]: {
				default: () => { },
			},
		},
	}
}
