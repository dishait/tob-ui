let urlAlphabet =
	'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'

/**
 * nano 唯一id生成器
 * 比传统 uuid 生成快 60%
 *
 * https://github.com/ai/nanoid
 *
 * 默认设置size为21，每秒生成一亿份id，连续工作四个世纪产生一次冲突的概率为 1%。
 * html标签的id属性不能以数字作为前缀，所以以字母作为前缀
 */
export default (size = 21, prefix = 'T') => {
	let id = ''
	let i = size
	while (i--) {
		id += urlAlphabet[(Math.random() * 64) | 0]
	}
	return prefix + id
}
