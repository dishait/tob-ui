const pagesJson = require('../pages.json')
const {
	useInquirerList,
	useInquirerConfirm,
	useInquirerQuestion
} = require('@markthree/ilazy')
const {
	remove,
	writeJson,
	createPath,
	pathExistsSync,
	terminalColor
} = require('@markthree/node-shared')
const {
	noticeFail,
	noticeSuccess
} = require('./shared/log')
const { sorts } = require('./shared/constant')

const runAutoRemove = async () => {
	const type = await useInquirerList(
		'您希望删除以下哪种类型的模块呢？',
		{
			default: 'component',
			choices: ['page', 'theme', 'component']
		}
	)

	const t = typeToZh(type)

	const name = await useInquirerQuestion(`请输入该${t}名称`)

	const isComponent = type === 'component'
	if (isComponent) {
		return await removeComponent(name)
	}

	const isTheme = type === 'theme'
	if (isTheme) {
		return await removeTheme(name)
	}

	const isPage = type === 'page'
	if (isPage) {
		const sort = await useInquirerList(
			`请选择该页面所属分类`,
			{ choices: sorts }
		)
		return await removePage(name, sort)
	}
}
runAutoRemove()

// 路径辅助工具
const p = createPath(__dirname)

// 输出路径
const srcBasePaths = {
	page: p('../pages'),
	theme: p('../theme'),
	component: p('../uni_modules/tob-ui/components')
}

// 类型转中文
const typeToZh = t => {
	const types = {
		page: '页面',
		theme: '主题',
		component: '组件'
	}
	return types[t] || '文件'
}

// 删除组件
const removeComponent = async name => {
	const sP = createPath(srcBasePaths.component)
	const src = sP(`./t-${name}`)
	const shouldRemove = await isWillRemove(src, '组件')
	if (shouldRemove) {
		await remove(src)
		return noticeSuccess('删除')
	}
	noticeFail('删除')
}

// 删除页面
const removePage = async (name, sort) => {
	const sP = createPath(srcBasePaths.page)
	const src = sP(`./${sort}/${name}`)
	const shouldRemove = await isWillRemove(src, '页面')
	if (shouldRemove) {
		pagesJson.pages = pagesJson.pages.filter(page => {
			return page.path !== `pages/${sort}/${name}/${name}`
		})
		await remove(src)
		await writeJson(p('../pages.json'), pagesJson, {
			spaces: '\t'
		})
		return noticeSuccess('删除')
	}
	noticeFail('删除')
}

// 删除主题
const removeTheme = async name => {
	const sP = createPath(srcBasePaths.theme)
	const src = sP(`./${name}.less`)
	const shouldRemove = await isWillRemove(src, '主题')
	if (shouldRemove) {
		await remove(src)
		return noticeSuccess('删除')
	}

	noticeFail('删除')
}

// 是否将删除
const isWillRemove = async (src, type) => {
	if (pathExistsSync(src)) {
		return await useInquirerConfirm(
			'再次确认是否删除?',
			false
		)
	}
	console.log(terminalColor.red(`项目中不存在该${type}`))
	return false
}
