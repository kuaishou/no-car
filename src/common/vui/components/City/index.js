import {queryCity} from '../../../api';

export default {
    name: 'City',
    data() {
        return {
            pccList: [],
            slced: {names: [], codes: []},
            searchTxt: '',
            isSearchFocus: false,
            cmCitys: ['北京市', '上海市', '广州市', '深圳市'],
            cmCitysed: '',
            inputTime: new Date().getTime(),
            setTimeQuery: null,
            slcsHeight: 0,
            stiteObj: {names: [], codes: []}
        }
    },
    props: {
        datas: Array,
        cityObj: {
            type: Object,
            default: {
                provinceName: '',
                cityName: '',
                districtName: '',
                province: '',
                city: '',
                district: ''
            }
        },
        show: {
            type: Boolean,
            default: true
        },
        isBlack: {
            tyep: Boolean,
            default: false
        }
    },
    computed: {
        addressData() {
            let pccList = this.datas || this.pccList;
            pccList = this.getNext(this.datas, undefined);

            this.getNextAs(this.datas, pccList);
            this.$nextTick(() => {
                this.setSled();
            });
            return pccList
        },
        citys() {
            return this.slced.codes[0] ? this.addressData.filter(ds => {
                return ds.code === this.slced.codes[0];
            })[0].next : [];
        },
        districts() {
            return this.slced.codes[1] ? this.citys.filter(ds => {
                return ds.code === this.slced.codes[1];
            })[0].next : [];
        },
        queryList() {
            const sObj = {
                isOk: false,
                data: []
            };

            this.inputTime = 0;

            this.setTimeQuery && clearTimeout(this.setTimeQuery);

            this.searchTxt && this.isQueryInData(this.addressData, this.searchTxt, sObj);

            return sObj;
        }
    },
    created() {
        if (!this.datas || !this.datas.length) {
            this.queryLocationData();
        }
        // if (!(window as any).qq) {
        //     this.qqMapGeolocation();
        // }
    },
    mounted() {
        this.setSlcsHeight();
    },
    methods: {
        setSlcsHeight() {
            this.slcsHeight = this.$refs.city.clientHeight - this.$refs.topSreach.clientHeight - this.$refs.cmcitys.clientHeight;
        },

        setSled() {
            if (this.cityObj.provinceName) {
                this.slced.names.push(this.cityObj.provinceName);
                this.slced.codes.push(this.cityObj.province);
            }

            if (this.cityObj.cityName) {
                this.slced.names.push(this.cityObj.cityName);
                this.slced.codes.push(this.cityObj.city);
            }

            if (this.cityObj.districtName) {
                this.slced.names.push(this.cityObj.districtName);
                this.slced.codes.push(this.cityObj.district);
            }

            this.$nextTick(() => {
                this.toScrollSlced();
            });
        },

        setVal(slcData) {
            if (slcData) {
                this.slced = slcData;
            }
            
            this.$emit('setCity', this.slced);
        },

        setSlced(slcData, i) {
            this.slced.names = this.slced.names.slice(0,i);
            this.slced.codes = this.slced.codes.slice(0,i);
            this.slced.names.push(slcData.name);
            this.slced.codes.push(slcData.code);
            this.cmCitysed = slcData.name;
            if (i === 2 || !slcData.next) {
                this.setVal();
            }
        },

        setCmSlced(cmCity){
            this.slced = {...cmCity.cmSlced};
            this.cmCitysed = cmCity.label;

            this.$nextTick(() => {
                this.toScrollSlced();
            });
        },

        toScrollSlced() {
            this.slced.names.forEach((name, i) => {
                const uEl = this.$refs.slcs.children[i];
                const liEl = uEl.querySelector('li.active');
                uEl.scrollTop = liEl ? liEl.offsetTop : 0;
            });
        },

        async queryLocationData(){
            let res = await queryCity();

            if (res.resultCode === '0') {
                this.pccList = res.result;
                // this.getMyLocation(0);
            } 
        },

        resetCyDatas(datas, removeArea){
            const rDatas = [];

            datas.forEach((item, i) => {
                if(!removeArea || removeArea.indexOf(item.name) < 0) rDatas.push(item);
            })

            return rDatas;
        },

        getNextAs(ydatas, datas, tlCmSlced){
            datas.forEach((item) => {
                let cmSlced = {names: [], codes: []};

                if (tlCmSlced) {
                    cmSlced = {names: [...tlCmSlced.names], codes: [...tlCmSlced.codes]};
                }

                const next = this.getNext(ydatas, item.code);
                const idx = this.cmCitys.indexOf(item.name);

                cmSlced.names.push(item.name);
                cmSlced.codes.push(item.code);

                if (idx >= 0 && !this.cmCitys[idx].label) {
                    this.cmCitys[idx] = {
                        label: this.cmCitys[idx],
                        cmSlced: cmSlced,
                    };
                }
                
                if(next.length) {
                    this.getNextAs(ydatas, next, cmSlced);
                    item.next = next;
                }
            })
        },

        getNext(ydatas, pcode){
            const d = [];
            for (let i = 0; i < ydatas.length; i++) {
                const item = ydatas[i]

                if(item.parent === pcode){
                    const obj = {name: item.name, code:item.value};
                    d.push(obj);
                    ydatas.splice(i,1);
                    i--;
                }
            }
            return d;
        },

        isQueryInData(datas, txt, result, ltAddData) {
            datas.forEach((item, i) => {
                const itemName = (typeof(item) == 'string' ? item : item.name).replace(/\s/g, '');

                let hasTxt = false;

                let addData = {names: [], codes: []};

                if (ltAddData) {
                    addData = {names: [...ltAddData.names], codes: [...ltAddData.codes]};
                }

                if(!/\W/.test(txt) && item.py) {
                    const AZ = (item.py.match(/[A-Z]/g)||'').join('');
                    hasTxt = item.py.toLocaleUpperCase().indexOf(txt.toLocaleUpperCase()) == 0 || AZ.indexOf(txt.toLocaleUpperCase()) >= 0;
                }else{
                    hasTxt = itemName.indexOf(txt) >= 0;
                }
                
                addData.names.push(item.name);
                addData.codes.push(item.code);

                if (this.queryfilter(itemName) && hasTxt){
                    result.isOk = true;
                    if (item.next) {
                        item.next.forEach(item => {
                            const ztAddData = {names: [...addData.names], codes: [...addData.codes]}
                            ztAddData.names.push(item.name);
                            ztAddData.codes.push(item.code);
                            result.data.push(ztAddData);
                        });
                    } else {
                        result.data.push(addData);
                    }
                } else if (item.next){
                    this.isQueryInData(item.next, txt, result, addData);
                }
            });

            return result;
        },

        queryfilter(name) {
            return /市$|县$|区$|香港|澳门|/.test(name);
        },

        setStiteSlced() {
            this.slced.names = this.stiteObj.names;
            this.slced.codes = this.stiteObj.codes;
            this.$nextTick(() => {
                this.toScrollSlced();
            });
        }
    },
    watch: {
        show(val, odlVal){
            if (val) {
                this.$nextTick(this.setSlcsHeight);
            }
        }
    }
}