<template>
    <div class="city" ref="city" v-show="show">
        <div class="top-search" :class="{'has-black': isBlack}" ref="topSreach">
            <span class="black" @click="$emit('black')" v-if="isBlack"></span>
            <input type="search" name="searachtxt" v-model="searchTxt" placeholder="城市名称" @focus="isSearchFocus = true" @blur="isSearchFocus = searchTxt !== '' || false" />
        </div>
        <div class="cmcitys" ref="cmcitys">
            <h3>常用城市</h3>
            <div class="lists">
                <span v-for="(cy, $i) of cmCitys" :key="$i" @click="setCmSlced(cy)" :class="{active: cmCitysed === cy.label}">{{cy.label || cy}}</span>
            </div>
        </div>
        <div class="vui-flex slcs" ref="slcs" :style="{height: slcsHeight + 'px'}">
            <ul class="flex" ref="lsprovince">
                <li v-for="item of addressData" :key="item.code" class="border-bottom-1px" :class="{active: item.code === slced.codes[0]}" @click="setSlced(item, 0)">{{item.name}}</li>
            </ul>
            <ul class="flex" v-show="citys && citys.length !== 0"  ref="lscity">
                <li v-for="item of citys" :key="item.code" class="border-bottom-1px" :class="{active: item.code === slced.codes[1]}" @click="setSlced(item, 1)">{{item.name}}</li>
            </ul>
            <ul class="flex" v-show="districts && districts.length !== 0" ref="lsdistricts">
                <li v-for="item of districts" :key="item.code" class="border-bottom-1px" :class="{active: item.code === slced.codes[2]}" @click="setSlced(item, 2)">{{item.name}}</li>
            </ul>
        </div>
        <div class="search-result" v-show="isSearchFocus">
            <ul class="lists" :class="{empty: !queryList.isOk}" v-show="searchTxt !== ''">
                <li class="vui-flex border-bottom-1px" v-for="(list, $i) of queryList.data" :key="$i" @click="setVal(list)">
                    <span class="flex" v-for="(code, $i) of list.codes" :key="code">{{list.names[$i]}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script src="./index.js"></script>

<style lang="less" scoped>
    .vui-flex{
        display: flex;
    
    }
    .vui-flex_item{
        flex: 1;
    }
    .border-bottom-1px{
        // position: relative;
        // &::after{
        //     content: '';
        //     position: absolute;
        //     border-bottom: 1px solid #bbb;
        //     left: 0;
        //     bottom: 0;
        //     width: 100%;
        //     -webkit-transform-origin: 0 bottom;
        //     transform-origin: 0 bottom;
        // }
        border-bottom: 2px solid #ddd; /*px*/
    }
    .city{
        height: 100%;
        padding:0;
    }
    .top-search{
        padding: 20px;
        background-color: #ff3f61;
        &.has-black{
            padding-left: 0;
        }
        input{
            width: 100%;
            padding: 0 10px 0 60px;
            height: 70px;
            line-height: 70px;
            font-size: 28px;
            border: none;
            background: #fff url(./img/search1.png) 10px center/50px auto no-repeat;
            border-radius: 8px;
        }
        .black{
            display: block;
            float: left;
            width: 80px;
            height: 70px;
            background: url(./img/black.png) center center/50% auto no-repeat;
            & + input{
                width: calc(100% - 80px);
            }
        }
    }
    .cmcitys{
        padding: 20px;
        background-color: #f1f1f1;
        h3{
            height: 60px;
            line-height: 60px;
            color: #888;
            position: relative;
            overflow: hidden;
            font-size: 28px;
            margin-bottom: 10px;

            &::after{
                content: '';
                width: 100%;
                height: 2px;    /*px*/
                background-color: #ccc;
                position: absolute;
                top: 50%;
                left: 130px;
                margin-top: -1px; /*px*/
                z-index: 1;
            }
        }
        .lists{
            span{
                width: 22%;
                height: 60px;
                line-height: 60px;
                margin: 15px 0;
                margin-right: 4%;
                background-color: #fff;
                border: 1px solid #ddd; /*px*/
                display: inline-block;
                border-radius: 8px;
                -webkit-border-radius: 8px;
                overflow: hidden;
                zoom: 1;
                font-size: 28px;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-sizing: border-box;
                -webkit-box-sizing: border-box;

                &:nth-child(4n+0) {
                    margin-right: 0;
                }
                
                &.active{
                    border-color: #ff3f61;
                    color: #ff3f61;
                }
            }
        }

        .stite-city{
            font-size: 28px;
            color: #666;
            span{
                color: #ff3f61;
            }
        }
    }
    .slcs{
        ul{
            height: 100%;
            overflow: auto;
            padding: 0 20px;
            position: relative;
            li{
                padding: 25px 0;
                font-size: 28px;
                &.active{
                    font-weight: 800;
                    color: #000;
                }
            }
        }
    }
    .search-result{
        position: fixed;
        top: 110px;
        left: 0;
        width: 100%;
        height: calc(100% - 110px);
        z-index: 9;
        background-color: rgba(0, 0, 0, 0.6);

        ul.lists{
            height: 100%;
            background-color: #fff;
            overflow: auto;

            li{
                padding: 25px;
                font-size: 28px;
                span{
                    text-align: center;
                    &:first-child{
                        text-align: left;
                    }
                    &:last-child{
                        text-align: right;
                    }
                }
            }

            &.empty::after{
                content: '查不到该城市';
                width: 100%;
                height: 200px;
                line-height: 325px;
                text-align: center;
                position: absolute;
                top: 50%;
                margin-top: -138px;
                left: 0;
                font-size: 16px;
                background: url(./img/empty_01.png) no-repeat 50% 20%;
                background-size: auto 120px;
                color: #666
            }
        }
    }
</style>

