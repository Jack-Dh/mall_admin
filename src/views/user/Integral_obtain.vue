<template>
    <div class="app-container">
      <div class="Box" style="margin-top: 30px">
        <div class="title" style="display: flex;justify-content: space-between;align-items: center">
          <span>签到送积分</span>
          <el-switch
            v-model="Integral_obtainList.signInStatus"
            active-text="启用"
            inactive-text="未启用">
          </el-switch>
        </div>

        <el-row :gutter="20">
          <el-col :span="6" style="text-align: right">
              <span>签到奖励</span>
          </el-col>

          <el-col :span="12">
            <div class="InpBox">
              <span>每天签到奖励</span>
              <el-input style="width: 100px" type="number" v-model="Integral_obtainList.everyNumber"></el-input>
              <span>积分</span>
            </div>
          </el-col>
        </el-row>


        <el-row :gutter="20">
          <el-col :span="16" :offset="6">
            <div class="InpBox">
              <span>每连续</span>
              <el-input style="width: 100px" type="number" v-model="Integral_obtainList.continueDays"></el-input>
              <span>天签到，奖励</span>
              <el-input style="width: 100px" type="number" v-model="Integral_obtainList.continueNumber"></el-input>
              <span>积分</span>
            </div>
          </el-col>
        </el-row>

<!--      广告位设置-->
<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16" :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <span>连续签到，每天递增奖励</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--              <span>积分，最多奖励</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--              <span>天后不再递增</span>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="20">-->
<!--          <el-col :span="6" style="text-align: right">-->
<!--            <span>广告位设置</span>-->
<!--          </el-col>-->

<!--          <el-col :span="12">-->
<!--            <div class="InpBox">-->
<!--              <span>标题</span>-->
<!--              <el-input style="width: 100px"></el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="24">-->
<!--          <el-col  :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                :on-remove="handleRemove"-->
<!--                multiple-->
<!--                :limit="3"-->
<!--                :file-list="fileList">-->
<!--                <span>图片</span>-->
<!--                <el-button size="small" type="primary">点击上传</el-button>-->
<!--                <span>建议640 x 320像素</span>-->
<!--              </el-upload>-->

<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row :gutter="20">-->
<!--          <el-col :span="16" :offset="6">-->
<!--            <div class="InpBox">-->
<!--              <span>链接</span>-->
<!--              <el-radio v-model="radio" label='1'>系统链接</el-radio>-->
<!--              <el-radio v-model="radio" label='1'>自定义链接</el-radio>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->


<!--        <el-row :gutter="20">-->
<!--          <el-col :span="8" :offset="6">-->
<!--            <div class="InpBox" style="margin-left: 20px">-->
<!--              <el-input></el-input>-->
<!--            </div>-->
<!--          </el-col>-->
<!--        </el-row>-->
      </div>
      <p>
        <el-button  type="primary" @click="integralsaveBtn">保存</el-button>
      </p>
    </div>



</template>

<script>
  import { integrallist } from '@/api/user'
  import { integralsave } from '@/api/user'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    export default {
        name: "Integral_obtain",
      data(){
          return{
            radio:1,
            Integral_obtainList:{
              signInStatus:true,//签到送积分状态
              everyNumber:null,//每天签到奖励多少积分
              continueDays:null, //每连续几天
              continueNumber:null,//奖励多少积分
              addNumber:null,//每天递增奖励多少积分
              addDays:null//最多奖励多少天后不再递增
            }
          }
      },
      methods:{
        integrallistQuery(){
          //积分获取查询
          integrallist().then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        },
        integralsaveBtn(){
          //积分获取保存
          integralsave(this.Integral_obtainList).then(res=>{
            console.log(res)
          }).catch(err=>{
            console.log(err)
          })
        },
      },
      created() {
          this.integrallistQuery()
      }
    }
</script>

<style scoped>
 .app-container{
   color: #909399;
 }

  .InpBox span {
    margin-left: 20px;
    margin-right: 20px;
  }

  .Box {
    /*dashed*/
    border: 1px solid #ececec;
    width: 100%;
    line-height: 50px;
    padding-bottom: 20px;
  }

  .Box .title {
    background-color: #f5f5f5;

    padding-left: 10px;
  }

  .Box .title p {
    margin-top: 0px;
  }
</style>
