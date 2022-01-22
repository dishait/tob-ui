const { terminalColor } = require('@markthree/node-shared')

const noticeSuccess = (type = '创建') => {
	console.log(terminalColor.green(type + '成功'))
}

const noticeFail = (type = '创建') => {
	console.log(terminalColor.red(type + '失败'))
}

module.exports = {
	noticeFail,
	noticeSuccess
}
