import { createHack } from './common.js'

// 注入
const injection = (k, v, schema) => {
	const openToggle = k === 'toggle' && v === true
	if (openToggle) {
		return toggleMode(k, v, schema)
	}
	// 原生兜底
	return (schema[k] = v)
}

// 切换模式
const toggleMode = (k, v, schema) => {
	return (schema['toggle'] = function (key, status) {
		const hasStatus = status !== undefined
		return (this[key] = hasStatus ? status : !this[key])
	})
}

export default createHack(injection)
