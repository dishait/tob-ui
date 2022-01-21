const {
	useInquirerList,
	useInquirerConfirm,
	useInquirerQuestion
} = require('@markthree/ilazy')
const {
	createFile,
	handlebars,
	createPath,
	readFileSync,
	pathExistsSync,
	templateCompile
} = require('@markthree/node-shared')
const {
	noticeFail,
	noticeSuccess
} = require('./shared/log')
const { sorts } = require('./shared/constant')

const runAutoCreate = async () => {
	const type = await useInquirerList(
		'😋 您希望创建以下哪种类型的文件呢？',
		{
			default: 'component',
			choices: ['page', 'component']
		}
	)

	const t = genTypeToZh(type)

	const name = await useInquirerQuestion(
		`🧐 请输入该${t}名称`
	)

	const sort = await useInquirerList(
		`🤔 请选择该${t}所属分类`,
		{ choices: sorts }
	)

	const desc = await useInquirerQuestion(
		`😁 请输入该${t}的中文描述`
	)
	const isComponent = type === 'component'
	if (isComponent) {
		return await genComponent(name, { name, desc })
	}
}
runAutoCreate()

// 创建模板编译助手(首字母大写)
handlebars.registerHelper(
	'up',
	v => v.charAt(0).toUpperCase() + v.slice(1)
)

// 路径辅助工具
const p = createPath(__dirname)

// 输出路径
const destBasePaths = {
	page: p('../pages'),
	component: p('../uni_modules/tob-ui/components')
}

// 类型转中文
const genTypeToZh = t => {
	const types = {
		page: '页面',
		component: '组件'
	}
	return types[t] || '文件'
}

// 基于模板生成文件
const gen = async (src, dest, payload) => {
	let template = readFileSync(src).toString()
	template = templateCompile(template)(payload)
	await createFile(dest, template)
}

// 创建组件
const genComponent = async (name, payload) => {
	const dp = createPath(destBasePaths.component)
	const dest = dp(`./t-${name}/t-${name}.vue`)
	if (isWillCreate(dest)) {
		const src = p('./template/component.vue')
		await gen(src, dest, payload)
		return noticeSuccess()
	}
	noticeFail()
}

// 是否将创建
const isWillCreate = async (
	dest,
	msg = '文件已存在，是否覆盖?'
) => {
	if (pathExistsSync(dest)) {
		return await useInquirerConfirm(msg, false)
	}
	return true
}
