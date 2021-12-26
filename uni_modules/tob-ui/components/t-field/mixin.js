
const noop = () => {}
export const FieldTrack = type => {
	return {
		inject: {
			FieldTrack: {
				from: 'FieldTrack',
				default: () => noop
			}
		},
		watch: {
			VModelValue() {
				this.FieldTrack({
					trigger: 'onChange',
					value: this.VModelValue
				})
			}
		},
		created() {
			this.FieldTrack({
				type,
				value: this.VModelValue
			})
		}
	}
}
