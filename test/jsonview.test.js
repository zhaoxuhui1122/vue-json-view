import {  mount } from '@vue/test-utils'
import JSONView from '../src/json-view/index.vue';

const mockData = require('../mock/mock.json')

describe('json-view组件测试', () => {
    it("设置deep", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: {},
                deep: 5
            }
        })
        expect(wrapper.vm.deep).toEqual(5)
    })
    it("设置jsonKey", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: {},
                jsonKey: 'jsonKey'
            }
        })
        expect(wrapper.vm.jsonKey).toEqual('jsonKey')
    })
    it("设置closed", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: {},
                closed: false
            }
        })
        expect(wrapper.vm.closed).toEqual(false)
    })
    it("设置iconStyle", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: {},
                iconStyle: 'circle'
            }
        })
        expect(wrapper.vm.iconStyle).toEqual('circle')
    })
    it("体积为1M的JSON文件，折叠所有节点", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                closed: true
            }
        })
        expect(wrapper.vm.closed).toEqual(true)
    })
    it("体积为1M的JSON文件，展开深度为1", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 1
            }
        })
        expect(wrapper.vm.deep).toEqual(1)
    })
    it("体积为1M的JSON文件，展开深度为2", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 2
            }
        })
        expect(wrapper.vm.deep).toEqual(2)
    })
    it("体积为1M的JSON文件，展开深度为3", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 3
            }
        })
        expect(wrapper.vm.deep).toEqual(3)
    })
    it("体积为1M的JSON文件，展开深度为4", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 4
            }
        })
        expect(wrapper.vm.deep).toEqual(4)
    })
    it("体积为1M的JSON文件，展开深度为5", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 5
            }
        })
        expect(wrapper.vm.deep).toEqual(5)
    })
    it("体积为1M的JSON文件，展开深度为6", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 6
            }
        })
        expect(wrapper.vm.deep).toEqual(6)
    })
    it("体积为1M的JSON文件，展开深度为10", () => {
        const wrapper = mount(JSONView, {
            propsData: {
                data: mockData,
                deep: 10
            }
        })
        expect(wrapper.vm.deep).toEqual(10)
    })

})
