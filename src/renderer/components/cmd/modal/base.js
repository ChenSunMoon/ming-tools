/**
 * @作者：陈明明
 * @创建日期 ： 2021/1/15 14:27
 */
export default {
    props:{
        cmd: Object,
        value: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onModalChange(e) {
            if (e) {
                this.onOpened()
            }
            this.$emit('input', e)
        },

    }
}