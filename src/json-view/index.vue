<template>
    <div :class="['json-view-container',theme]">
        <div :class="['json-view', length ? 'closeable' : '']" :style="{fontSize:fontSize+'px',lineHeight:lineHeight+'px'}">
            <!--icon-style-square-->
            <span @click="toggleClose" class="angle" v-if="length && iconStyle==='square'">
                <svg v-if="innerclosed" :fill="iconColors[0]" width="1em" height="1em" viewBox="0 0 1792 1792"
                     style="vertical-align: middle; color: rgb(42, 161, 152); height: 1em; width: 1em;"><path
                         d="M1344 800v64q0 14-9 23t-23 9h-352v352q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-352h-352q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h352v-352q0-14 9-23t23-9h64q14 0 23 9t9 23v352h352q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path></svg>
                <svg v-if="!innerclosed" :fill="iconColors[1]" width="1em" height="1em" viewBox="0 0 1792 1792"
                     style="vertical-align: middle; color: rgb(88, 110, 117); height: 1em; width: 1em;"><path
                         d="M1344 800v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h832q14 0 23 9t9 23zm128 448v-832q0-66-47-113t-113-47h-832q-66 0-113 47t-47 113v832q0 66 47 113t113 47h832q66 0 113-47t47-113zm128-832v832q0 119-84.5 203.5t-203.5 84.5h-832q-119 0-203.5-84.5t-84.5-203.5v-832q0-119 84.5-203.5t203.5-84.5h832q119 0 203.5 84.5t84.5 203.5z"></path></svg>
            </span>
            <!--icon-style-circle-->
            <span @click="toggleClose" class="angle" v-if="length&& iconStyle==='circle'">
                <svg v-if="!innerclosed" viewBox="0 0 24 24" :fill="iconColors[0]" preserveAspectRatio="xMidYMid meet"
                     style="vertical-align: middle; color: rgb(1, 160, 228); height: 1em; width: 1em;"><path
                         d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M7,13H17V11H7"></path></svg>
                <svg v-if="innerclosed" viewBox="0 0 24 24" :fill="iconColors[1]" preserveAspectRatio="xMidYMid meet"
                     style="vertical-align: middle; color: rgb(161, 106, 148); height: 1em; width: 1em;"><path
                         d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M13,7H11V11H7V13H11V17H13V13H17V11H13V7Z"></path></svg>
            </span>
            <!--icon-style-triangle-->
            <span @click="toggleClose" class="angle" v-if="length&& iconStyle==='triangle'">
                <svg v-if="!innerclosed" viewBox="0 0 15 15" :fill="iconColors[0]"
                     style="vertical-align: top; color: #3c4047; height: 1em; width: 1em; padding-left: 2px;"><path
                         d="M0 5l6 6 6-6z"></path></svg>
                <svg v-if="innerclosed" viewBox="0 0 15 15" :fill="iconColors[1]"
                     style="vertical-align: top; color: #3c4047; height: 1em; width: 1em; padding-left: 2px;"><path
                         d="M0 14l6-6-6-6z"></path></svg>
            </span>
            <div class="content-wrap">
                <p :class="['first-line',length>0?'pointer':'']" @click="toggleClose">
                    <span v-if="jsonKey" class="json-key">"{{jsonKey}}": </span>
                    <span v-if="length">{{prefix}}{{innerclosed ? ('...' + subfix) : ''}}
                        <span class="json-note">{{innerclosed ? (length+' items') : ''}}</span>
                    </span>
                    <span v-if="!length">{{isArray ? '[]' : '{}'}}</span>
                </p>
                <div v-if="!innerclosed && length" class="json-body">
                    <template v-for="(item, index) in items">
                        <json-view :closed="isClose(templateDeep+1)"
                                   v-if="item.isJSON"
                                   :key="index"
                                   :data="item.value"
                                   :jsonKey="item.key"
                                   :currentDeep="templateDeep+1"
                                   :deep="deep"
                                   :iconStyle="iconStyle"
                                   :theme="theme"
                                   :fontSize="fontSize"
                                   :lineHeight="lineHeight"
                                   :iconColor="iconColors"
                                   :isLast="index === items.length - 1">
                        </json-view>
                        <p class="json-item" v-else :key="index">
                            <span class="json-key">
                                {{(isArray ? '' : '"' + item.key + '":')}}
                            </span>

                            <span :class="['json-value',valueType(item)]">
                                {{`${typeof item.value==='string'?'"':''}${item.value}${typeof item.value==='string'?'"':''}${index ===items.length - 1 ? '' : ','}`}}
                            </span>
                        </p>
                    </template>
                    <span v-if="!innerclosed" class="base-line"></span>
                </div>
                <p v-if="!innerclosed " class="last-line">
                    <span>{{subfix}}</span>
                </p>
            </div>
        </div>

    </div>
</template>
<script>
import jsonView from './jsonView';
export default jsonView
</script>
<style scoped lang="less">
@import "./style/index";
@import "./style/on-dark";
@import "./style/vs-code";
</style>
