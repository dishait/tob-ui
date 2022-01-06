// 避免被tree shaking掉
// #ifdef VUE3
const query = vm => uni.createSelectorQuery().in(vm)
// #endif

/**
 * 查询节点信息
 * https://uniapp.dcloud.io/api/ui/nodes-info?id=selectorqueryselectall
 */
export default (vm, selector, more = false) => {
	const queryHandle = resolve => {
		const method = more ? 'selectAll' : 'select'
		// #ifdef VUE2
		const ql = uni.createSelectorQuery().in(vm)[method](selector)
		// #endif

		// #ifdef VUE3
		const ql = query(vm)[method](selector)
		// #endif
		ql.boundingClientRect(rect => resolve(rect)).exec()
	}
	return new Promise(queryHandle)
}
