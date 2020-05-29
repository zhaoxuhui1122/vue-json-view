export default {
    name: 'jsonView',
    props: {
        data: { // 传入的json数据
            type: [Object, Array],
            required: true
        },
        jsonKey: { // json的key值，用于第二层及二层以上的组件的key值
            type: String,
            default: ''
        },
        closed: { // 是否折叠
            type: Boolean,
            default: false
        },
        isLast: { //是否是最后一行
            type: Boolean,
            default: true
        },
        fontSize: { //字体大小
            type: Number,
            default: 14
        },
        lineHeight: { //行高
            type: Number,
            default: 24
        },
        deep: { // 展开深度
            type: Number,
            default: 3
        },
        currentDeep: { // 当前为递归的第几层
            type: Number,
            default: 1
        },
        iconStyle: { // 折叠icon样式
            type: String,
            default: 'square'
        },
        iconColor: { //icon颜色
            type: Array,
            default() {
                return []
            }
        },
        theme: { // 主题
            type: String,
            default: ''
        },
        hasSiblings: { // 是否有兄弟节点
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            innerclosed: this.closed,
            templateDeep: this.currentDeep,
            visible: false
        }
    },
    computed: {
        isArray() {
            return this.getDataType(this.data) === 'array'
        },
        length() {
            return this.isArray ? this.data.length : Object.keys(this.data).length
        },
        subfix() {
            const data = this.data
            if (this.isEmptyArrayOrObject(data)) { // 如果是空数组或空对象
                return ''
            } else {
                return (this.isArray ? ']' : '}') + (this.isLast ? '' : ',')
            }
        },
        prefix() {
            return this.isArray ? '[' : '{'
        },
        items() {
            const json = this.data

            if (this.isArray) {
                return json.map(item => {
                    const isJSON = this.isObjectOrArray(item)
                    return {
                        value: item,
                        isJSON,
                        key: ''
                    }
                })
            }
            return Object.keys(json).map(key => {
                const item = json[key]
                const isJSON = this.isObjectOrArray(item)
                return {
                    value: item,
                    isJSON,
                    key
                }
            })
        },
        iconColors() {
            const {theme, iconColor} = this
            if (iconColor.length === 2) {
                return iconColor
            } else {
                if (theme === 'one-dark') {
                    return ['#747983', '#747983']
                } else if (theme === 'vs-code') {
                    return ['#c6c6c6', '#c6c6c6']
                } else {
                    return ['#747983', '#747983']
                }
            }
        }
    },
    mounted() {
        setTimeout(() => {
            this.visible = true
        }, 0)
    },
    methods: {
        getDataType(data) {
            return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
        },
        isObjectOrArray(source) {
            return ['array', 'object'].includes(this.getDataType(source))
        },
        toggleClose() {
            if (this.length === 0) {
                return
            }
            if (this.innerclosed) {
                this.innerclosed = false
            } else {
                this.innerclosed = true
            }
        },
        isClose() {
            return this.templateDeep + 1 > this.deep
        },
        isEmptyArrayOrObject(data) { // 空数组或者空对象
            return [{},
                []
            ].map(item => JSON.stringify(item)).includes(JSON.stringify(data))
        },
    },
    watch: {
        closed() {
            this.innerclosed = this.closed
        }
    }
}
