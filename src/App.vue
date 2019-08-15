<template>
    <div id="app">
        <div class="layout">
            <h1>vue-json-view</h1>
            <a target="_blank" href="https://github.com/zhaoxuhui1122/vue-json-view">使用文档</a>

            <div class="setting">
                <ul>
                    <li>
                        <label>主题</label>
                        <select v-model="theme">
                            <option value="">默认</option>
                            <option value="one-dark">one-dark</option>
                            <option value="vs-code">vs-code</option>
                        </select>
                    </li>
                    <li>
                        <label>折叠全部</label>
                        <select v-model="closed">
                            <option :value="false">false</option>
                            <option :value="true">true</option>
                        </select>
                    </li>

                    <li>
                        <label>deep</label>
                        <select v-model="deep">
                            <option v-for="item in 10" :value="item">{{item}}</option>
                        </select>
                    </li>
                    <li>
                        <label>icon-style</label>
                        <select v-model="iconStyle">
                            <option value="square">square</option>
                            <option value="circle">circle</option>
                            <option value="triangle">triangle</option>
                        </select>
                    </li>
                    <li>
                        <label>icon-color</label>
                        <input type="color" v-model="color1">
                        <input type="color"  v-model="color2">
                    </li>
                    <li>
                        <label>font-size</label>
                        <select v-model="fontSize">
                            <option v-for="item in 10" :value="item+11">{{item+11}}</option>
                        </select>
                    </li>
                    <li>
                        <label for="line-height">line-height</label>
                        <select v-model="lineHeight">
                            <option v-for="item in 20" :value="item*2+14">{{item*2+14}}</option>
                        </select>
                    </li>

                </ul>
            </div>
            <div class="content">
                <json-view :data="json" :theme="theme" :deep="deep" :iconStyle="iconStyle" :fontSize="fontSize" :lineHeight="lineHeight" :closed="closed" :iconColor="iconColor"/>
            </div>
        </div>
    </div>
</template>

<script>
    import jsonView from './json-view/index.vue';
    // import jsonView from '../build/index';
    // import jsonView from 'vue-json-views';
    import json from '../mock/mock.json';
    export default {
        name: 'app',
        components: {
            jsonView
        },
        data() {
            return {
                json,
                theme: '',
                fontSize: 14,
                lineHeight: 24,
                deep: 3,
                closed: false,
                iconStyle: 'square',
                closed: false,
                color1: '',
                color2: ''
            }
        },
        computed: {
            iconColor() {
                const { color1, color2 } = this;

                if (color1 && color2) {
                    return [color1, color2];
                } else {
                    return [];
                }
            }
        }
    }
</script>

<style scoped lang="less">
    #app {
        .layout {
            width: 1200px;
            margin: 0 auto;

            h1 {
                font-size: 26px;
                font-weight: 400;
                margin: 12px 0;
            }

            a {
                display: block;
                background-color: #f8f8f9;
                border-radius: 4px;
                padding: 8px 16px;
                border: 1px solid #edeff0;
                border-radius: 4px;
                margin-bottom: 20px;
                text-decoration: none;
                color: #2d8cf0;
            }

            .setting {
                border: 1px solid #ccc;
                padding: 10px 20px;

                h3 {
                    line-height: 1.6;
                    font-size: 18px;
                    color: #333;
                }
            }

            ul {
                list-style: none;
                padding: 0;
                margin: 0;
                display: flex;
                align-items: center;

                li {
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                    padding-right: 20px;

                    label {
                        font-size: 13px;
                        padding-right: 10px;
                        color: #333;
                    }

                    select {
                        display: block;
                        width: 80px;
                        height: 28px;
                        background: #fff;
                    }
                }
            }

            .content {
                border: 1px solid #ccc;
                border-top: none;
            }
        }
    }
</style>
