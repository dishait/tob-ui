// 避免被 tree shaking 掉
const createQl = (vm, method, selector) =>
	uni.createSelectorQuery().in(vm)[method](selector)

/**
 * 查询节点信息
 * https://uniapp.dcloud.io/api/ui/nodes-info?id=selectorqueryselectall
 */
export default (vm, selector, more = false) => {
	const queryHandle = resolve => {
		const method = more ? 'selectAll' : 'select'
		let ql = createQl(vm, method, selector)
		ql.boundingClientRect(rect => resolve(rect)).exec()
	}
	return new Promise(queryHandle)
}
