
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
                <el-table :data="tableData" border show-summary :summary-method="getSummaries" style="width: 100%">
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
                            <li v-for="(goods,index) in oftenGoods" :key="goods.id" @click="addOrderList(goods)">
                                <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                                <span class="foodName">{{goods.goodsName}}</span>
                                <span class="foodPrice">￥{{goods.price}}元</span>
                            </li>
                        </ul>
                    </div>
                      <div class="title">更多商品</div>
                      <div>
                        <moreGoods ></moreGoods>
                      </div>
                </div>
          </el-col>
        </el-row>
      </div>
      <el-button type="danger" @click=deleteAll>删除全部</el-button>
      <el-button type="success" @click="topayMoney">结账</el-button>
    </div>
  </div>
</template>

<script>
import leftNav from "@/components/pos/leftNav";
import moreGoods from "@/components/pos/moreGoods";
import axios from 'axios'


$(function(){
  $('.often-goods-list li').click(function(){
    $(this).toggleClass('goods-select');
  })
})

export default {
  data() {
    return {
      isActive:false,
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
              goodsId:0,
              goodsName:'香辣鸡腿堡',
              price:18
          }, {
              goodsId:1,
              goodsName:'田园鸡腿堡',
              price:15
          }, {
              goodsId:2,
              goodsName:'和风汉堡',
              price:15
          }, {
              goodsId:3,
              goodsName:'快乐全家桶',
              price:80
          }, {
              goodsId:4,
              goodsName:'脆皮炸鸡腿',
              price:10
          }, {
              goodsId:5,
              goodsName:'魔法鸡块',
              price:20
          }, {
              goodsId:6,
              goodsName:'可乐大杯',
              price:10
          }, {
              goodsId:7,
              goodsName:'雪顶咖啡',
              price:18
          }, {
              goodsId:8,
              goodsName:'大块鸡米花',
              price:15
          }, {
              goodsId:9,
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
    leftNav,
    moreGoods
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
      toggleClass(event,index){
        if(index==this.oftenGoods.goodsId){
          this.isActive=!this.isActive;
        }
       },
      addOrderList(goods){
            this.totalCount=0; //汇总数量清0
            this.totalMoney=0;
            let isHave=false;
            //判断是否这个商品已经存在于订单列表
            for(let i =0;i<this.tableData.length;i++){
              if(this.tableData[i].goodsId == goods.goodsId){
                isHave = true;
              }
            }
            //根据isHave的值判断订单列表中是否已经有此商品
            if(isHave){
                //存在就进行数量添加
                 let arr = this.tableData.filter(o =>o.goodsId == goods.goodsId);
                 console.log(arr);
                 arr[0].count++;
            }else{
                //不存在就推入数组
                let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1,total:goods.price};
                this.tableData.push(newGoods);
            }

            //进行数量和价格的汇总计算
            // this.tableData.forEach((element) => {
            //     console.log(33)
            //     this.totalCount+=element.count;
            //     this.total=this.total+(element.price*element.count);   
            // });
      },
      deleteAll(){
        this.$confirm('此操作将删除全部已选择商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData=[];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
        
      },
       getSummaries(param) {
        //param 是固定的对象，里面包含 columns与 data参数的对象 {columns: Array[4], data: Array[5]},包含了表格的所有的列与数据信息
        const { columns, data } = param;
        console.log(param)
        console.log(data)
        const sums = [];
        columns.forEach((column, index) => {
          //console.log(column)
          //console.log(index)
          if (index === 0) {
            sums[index] = '总价';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          //验证每个value值是否是数字，如果是执行if
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              //const value = Number(curr);
              //if (!isNaN(value)) {
              return prev + curr;
              // } else {
              //   return prev;
              // }
            }, 0);
            sums[index];
          } else {
            // sums[index] = 'N/A';
          }
        });

        return sums;
      },
      topayMoney(){
        this.$router.push({path:'/pos/payMoney'})
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
      cursor: pointer;
      background-color:#fff;
   }
  .o-price{
      color:#58B7FF; 
   }
   .goods-select{
      color: #fff;
      background-color: #409eff !important;
      border-color: #409eff !important;
   }
</style>