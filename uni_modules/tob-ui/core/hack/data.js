import { is } from '../tools/types.js'

export default v => {
	if (is('Function', v)) {
		return v
	}

	if (is('Object', v)) {
		return () => v
	}

	throw new Error('data 生成器只支持接收函数类型与对象类型')
}
