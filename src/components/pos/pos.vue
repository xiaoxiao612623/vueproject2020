
<template>
  <div class="pos">
      <router-link to="/goHome">goHome</router-link>
    <!--左侧导航-->
    <leftNav></leftNav>

    <!--操作区域-->
    <div class="main">
      <router-view></router-view>
      <div style="padding-left: 10px;">
        <el-row>
          <el-col :span="8">
            <el-tabs>
              <el-tab-pane label="点餐">
                点餐
                <el-table :data="tableData" border show-summary style="width: 100%">
                  <el-table-column prop="goodsName" label="商品"></el-table-column>
                  <el-table-column prop="count" label="量" width="50"></el-table-column>
                  <el-table-column prop="price" label="单价" width="50"></el-table-column>
                  <el-table-column prop="total" label="金额" width="70"></el-table-column>
                  <el-table-column label="操作" width="130" fixed="right">
                    <template slot-scope="scope">
                      <el-button type="text" size="small" @click.native.prevent="deleteRow(scope.$index, tableData)">删除</el-button>
                      <el-button type="text" size="small" @click.native.prevent="add(scope.$index, tableData)">增加</el-button>
                      <el-button type="text" size="small" @click.native.prevent="reduce(scope.$index, tableData)">减少</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="挂单">挂单</el-tab-pane>
              <el-tab-pane label="外卖">外卖</el-tab-pane>
            </el-tabs>
          </el-col>
          <!--商品展示-->
          <el-col :span="16">
              <div class="often-goods">
                    <div class="title">常用商品</div>
                    <div class="often-goods-list">
                         <ul style="overflow: hidden;">
                            <li v-for="(goods,index) in oftenGoods" :key="goods.id" :class = "isactive == index ? 'addclass' : '' " @click="toggleClass($event,index)">
                                <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                <span class="foodName">{{goods.goodsName}}</span>
                                <span class="foodPrice">￥{{goods.price}}元</span>
                            </li>
                        </ul>
                    </div>
                </div>
                  <div class="goods-type" style="padding-left: 50px;">
                        <el-tabs>
                            <el-tab-pane label="汉堡">
                                汉堡
                            </el-tab-pane>
                                <el-tab-pane label="小食">
                                小食
                            </el-tab-pane>
                            <el-tab-pane label="饮料">
                                饮料
                            </el-tab-pane>
                            <el-tab-pane label="套餐">
                                套餐
                            </el-tab-pane>
                        </el-tabs>
                    </div>
          </el-col>
        </el-row>
      </div>
      <el-button type="warning">挂单</el-button>
      <el-button type="danger">删除</el-button>
      <el-button type="success">结账</el-button>
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/pos/leftNav";
import axios from 'axios'

export default {
  data() {
    return {
      isactive : -1,
      tableData: [
        {
          goodsName: "可口可乐",
          price: 8,
          total: 8,
          count: 1
        },
        {
          goodsName: "香辣鸡腿堡",
          price: 15,
          total: 15,
          count: 1
        },
        {
          goodsName: "爱心薯条",
          price: 8,
          total: 8,
          count: 1
        },
        {
          goodsName: "甜筒",
          price: 8,
          total: 8,
          count: 1
        }
      ],
      oftenGoods:[
          {
              goodsId:1,
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:2,
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:3,
              goodsName:'和风汉堡',
              price:15
          }, {
              goodsId:4,
              goodsName:'快乐全家桶',
              price:80
          }, {
              goodsId:5,
              goodsName:'脆皮炸鸡腿',
              price:10
          }, {
              goodsId:6,
              goodsName:'魔法鸡块',
              price:20
          }, {
              goodsId:7,
              goodsName:'可乐大杯',
              price:10
          }, {
              goodsId:8,
              goodsName:'雪顶咖啡',
              price:18
          }, {
              goodsId:9,
              goodsName:'大块鸡米花',
              price:15
          }, {
              goodsId:20,
              goodsName:'香脆鸡柳',
              price:17
          }

      ]
    };
  },
  name: "Pos",
  created() {
    //   axios.get('http://old.jspag.com/DemoApi/oftenGoods.php').then(res=>{
    //       console.log(res)
    //       this.oftenGoods=response.data;
    //   }).catch(error=>{
    //       console.log(error)
    //   })
  },
  components: {
    leftNav
  },
  methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      add(index, rows) {
          rows[index].count++; 
          rows[index].total= rows[index].price*rows[index].count;
      },
      reduce(index,rows) {
           if(rows[index].count<1){
              this.$message({
                message: '亲，数量不能小于0(⊙o⊙)哦！',
                type: 'warning'
              });
              return;
          }
          rows[index].count--;
          rows[index].total= rows[index].price*rows[index].count;
      },
        toggleClass(e,index){
            //  this.isActive=!this.isActive;
            this.isactive = index

       }
 
  },
};
</script>
<style>
.main {
  float: left;
  width: 95%;
  background-color: #eff2f7;
  height: 100%;
  overflow: auto;
}
 .title{
       height: 20px;
       border-bottom:1px solid #D3DCE6;
       background-color: #F9FAFC;
       padding:10px;
   }
   .often-goods-list ul li{
      list-style: none;
      float:left;
      border:1px solid #E5E9F2;
      padding:10px;
      margin:5px;
      background-color:#fff;
   }
  .o-price{
      color:#58B7FF; 
   }
</style>