import $DA from './data.js'
import $DE from './designs'
import $P from './props.js'
import $M from './methods.js'
import $C from './computed.js'
import { createHack } from './common.js'

const hacks = {
	data: $DA,
	props: $P,
	methods: $M,
	designs: $DE,
	computed: $C
}

const logic = (k, v, newSchema) => {
	const hack = hacks[k]
	const isMixins = k === 'mixins'
	const isDesigns = k === 'designs'
	if (isMixins) {
		const mixins = newSchema['mixins'] || []
		mixins.push(...v)
		newSchema['mixins'] = mixins
		return
	}

	if (isDesigns) {
		const mixins = newSchema['mixins'] || []
		mixins.push(...hack(v))
		newSchema['mixins'] = mixins
		return
	}

	if (hack) {
		return (newSchema[k] = hack(v))
	}

	newSchema[k] = v
}

export default createHack(logic)
