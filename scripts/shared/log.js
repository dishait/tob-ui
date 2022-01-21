const { terminalColor } = require('@markthree/node-shared')

const noticeSuccess = (msg = '创建成功') => {
	console.log(terminalColor.green(msg))
}

const noticeFail = (msg = '创建失败') => {
	console.log(terminalColor.red(msg))
}

module.exports = {
	noticeFail,
	noticeSuccess
}
