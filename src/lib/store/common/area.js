import { util } from "./../../util/index";


const state = {
    /**应用程序定位 */
    location: undefined,
    locationLongitude: undefined,
    locationLatitude: undefined,
    allAreaData: [],
    allAreaDataHasNull: [],
    locationArea: undefined
}

const getters = {
    /** 当前缓存定位的地区信息 */
    locationStorage(state) {
        return util.storage.getStorage("locationAddress");
    },
    /** 根据当前节点获取 item */
    getAreaItem: (state) => (id) => {
        for (const province of state.allAreaData) {
            if (province.id === id)
                return province;
            for (const city of province.childs) {
                if (city.id === id)
                    return city;
                for (const county of city.childs) {
                    if (county.id === id)
                        return county;
                }
            }
        }
    },
    /** 根据当前节点获取 item */
    getAreaHasNullItem: (state) => (id, level) => {
        for (const province of state.allAreaDataHasNull) {
            if (level === 1 && province.id === id)
                return province;
            for (const city of province.childs) {
                if (level === 2 && city.id === id)
                    return city;
                for (const county of city.childs) {
                    if (level === 3 && county.id === id)
                        return county;
                }
            }
        }
    },
    /** 根据当前获取 item */
    getAreaAllItem: (state) => (id) => {
        for (const province of state.allAreaData) {
            for (const city of province.childs) {
                for (const county of city.childs) {
                    if (county.id === id)
                        return [province, city, county];
                }
            }
        }
    }
}

const mutations = {
    /** 初始化地区数据 */
    initLocation(state) {
        var data = util.storage.getStorage("locationAddress");
        if (data){
            state.location = data;
        }
    },
    /** 当前缓存定位的地区信息 */
    setLocation(state, data) {
        util.storage.setStorage("locationAddress", data);
        state.location = data;
    },
    /** 设置定位点 */
    setLocationPoint(state, data) {
        state.locationLongitude = data.lng;
        state.locationLatitude = data.lat;
    },
    /** 设置地区 */
    area(state, data) {
        state.allAreaData = data;
    },
    /** 设置地区包含可控数据 */
    areaHasNull(state, data) {
        var copyData = JSON.parse(JSON.stringify(data));
        for (const province of copyData) {
            if (!province.childs) province.childs = [];
            for (const city of province.childs) {
                if (!city.childs) city.childs = [];
                city.childs.splice(0, 0, {
                    id: city.id,
                    name: '不限'
                });

            }

            province.childs.splice(0, 0, {
                id: province.id,
                name: '不限',
                childs: [{
                    id: province.id,
                    name: '不限'
                }],
            });
        }

        copyData.splice(0, 0, {
            id: '',
            name: '不限',
            childs: [{
                id: '',
                name: '不限',
                childs: [{
                    id: '',
                    name: '不限',
                }],
            }],
        });
        state.allAreaDataHasNull = copyData;
    }
}

const actions = {
    /** 选择地区组件 - 存在为空数据 */
    async createAreaPickerHasNullComponent({
        dispatch,
        commit,
        getters,
        state,
        rootState,
        rootGetters
    }, onChange) {
        return await new Promise((resolve, reject) => {
            var pickerResult = util.f7.f7App.picker.create({
                rotateEffect: true,
                formatValue: function (values) {
                    return values[1];
                },
                toolbarCloseText: '确定',
                cols: [{
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaDataHasNull.map(t => t.id),
                        displayValues: state.allAreaDataHasNull.map(t => t.name),
                        onChange: function (picker, country) {
                            if (!picker.cols[1].replaceValues) return;
                            var item = getters.getAreaHasNullItem(country, 1);
                            var newIdList = item.childs.map(t => t.id);
                            picker.cols[1].replaceValues(
                                newIdList,
                                item.childs.map(t => t.name)
                            );
                            onChange(picker, country, 1)
                            if (newIdList.length > 0)
                                picker.cols[1].onChange(picker, newIdList[0])

                        }
                    },
                    {
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaDataHasNull[0].childs.map(t => t.id),
                        displayValues: state.allAreaDataHasNull[0].childs.map(t => t.name),
                        onChange: function (picker, country) {
                            if (!picker.cols[1].replaceValues) return;
                            if (!picker.cols[2].replaceValues) return;
                            var item = getters.getAreaHasNullItem(country, 2);
                            var newIdList = item.childs.map(t => t.id);
                            picker.cols[2].replaceValues(
                                newIdList,
                                item.childs.map(t => t.name)
                            );
                            onChange(picker, country, 2)
                            if (newIdList.length > 0)
                                picker.cols[2].onChange(picker, newIdList[0])
                        }
                    },
                    {
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaDataHasNull[0].childs[0].childs.map(t => t.id),
                        displayValues: state.allAreaDataHasNull[0].childs[0].childs.map(t => t.name),
                        onChange: function (picker, country) {
                            onChange(picker, country, 3)
                        }
                    }
                ]
            });
            resolve(pickerResult);
        });
    },
    /** 选择地区组件 - 必选数据 */
    async createAreaPickerComponent({
        commit,
        getters,
        state
    }, onChange) {
        return await new Promise((resolve, reject) => {
            var pickerResult = util.f7.f7App.picker.create({
                rotateEffect: true,
                formatValue: function (values) {
                    return values[1];
                },
                closeByOutsideClick: false,
                toolbarCloseText: '确定',
                cols: [{
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaData.map(t => t.id),
                        displayValues: state.allAreaData.map(t => t.name),
                        onChange: function (picker, country) {
                            if (!picker.cols[1].replaceValues) return;
                            var item = getters.getAreaItem(country, 1);
                            var newIdList = item.childs.map(t => t.id);
                            picker.cols[1].replaceValues(
                                newIdList,
                                item.childs.map(t => t.name)
                            );
                            onChange(picker, country, 1)
                            if (newIdList.length > 0)
                                picker.cols[1].onChange(picker, newIdList[0])
                        }
                    },
                    {
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaData[0].childs.map(t => t.id),
                        displayValues: state.allAreaData[0].childs.map(t => t.name),
                        onChange: function (picker, country) {
                            if (!picker.cols[1].replaceValues) return;
                            if (!picker.cols[2].replaceValues) return;
                            var item = getters.getAreaItem(country, 2);
                            var newIdList = item.childs.map(t => t.id);
                            picker.cols[2].replaceValues(
                                newIdList,
                                item.childs.map(t => t.name)
                            );
                            onChange(picker, country, 2)
                            if (newIdList.length > 0)
                                picker.cols[2].onChange(picker, newIdList[0])
                        }
                    },
                    {
                        textAlign: "left",
                        width: '33%',
                        values: state.allAreaData[0].childs[0].childs.map(t => t.id),
                        displayValues: state.allAreaData[0].childs[0].childs.map(t => t.name),
                        onChange: function (picker, country) {
                            onChange(picker, country, 3)
                        }
                    }
                ]
            });
            resolve(pickerResult);
        });
    },
    /** 获取全部地区 */
    async getAreaAll({
        commit,
        state
    }) {
        return await new Promise((resolve, reject) => {
            util.webApi.get({
                url: util.url.commonUrl.getAllAreaList,
                loading: false,
                success: function (result) {
                    console.log(JSON.stringify(result));
                    commit('area', result);
                    commit('areaHasNull', result);
                    resolve(result)
                },
                error: function () {
                    resolve(false)
                }
            });
        });
    },
    /** 通过定位 获取数据 */
    async addressToLngLat({
        commit,
        getters,
        state
    }, addressDetail) {
        return await new Promise((resolve, reject) => {
            util.webApi.get({
                url: util.url.commonUrl.addressToLngLat,
                data: {
                    address: addressDetail
                },
                loading: true,
                success: lngLat => {
                    resolve(lngLat);
                },
                error: () => {
                    resolve(false);
                }
            });
        });
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}