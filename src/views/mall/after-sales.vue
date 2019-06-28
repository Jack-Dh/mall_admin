<template>
  <div class="app-container">

    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-input v-model="listQuery.aftersaleSn" clearable class="filter-item" style="width: 200px;"
                placeholder="请输入售后编号"/>
      <el-input v-model="listQuery.orderSn" clearable class="filter-item" style="width: 200px;" placeholder="请输入订单编号"/>
      <el-select v-model="listQuery.type" multiple style="width: 200px" class="filter-item" placeholder="请选择售后方式">
        <el-option v-for="item in statusMapNew" :value="item.value" :label="item.label"/>
      </el-select>
      <el-select v-model="listQuery.status" style="width: 200px" class="filter-item" placeholder="请选择售后状态">
        <el-option v-for="(key, value) in aftersaleStatuIng" :key="key" :label="key" :value="value"/>
      </el-select>
      <el-button v-permission="['GET /admin/order/list']" class="filter-item" type="primary" icon="el-icon-search"
                 @click="afterFilter">查找
      </el-button>
      <el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">导出
      </el-button>
    </div>

    <!-- 查询结果 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="正在查询中。。。" border fit highlight-current-row>

      <el-table-column align="center" width="260" label="商品信息">

        <template slot-scope="scope">
          <div class="goodsBox" style="display: flex;justify-content: space-between">
            <div>
              <el-popover
                placement="top-start"
                width="200"
                trigger="hover"
              >
                <div slot="reference">
                  <img :src="scope.row.picUrl" style="width: 80px;height: 80px">
                </div>
                <img :src="scope.row.picUrl" style="width: 100%;height: 200px">

              </el-popover>

            </div>
            <div style="text-align: left">
              <div style="font-weight: bold">{{scope.row.goodsName}}</div>
              <div v-for="item in scope.row.specifications">{{item}}</div>
              <div>x{{scope.row.number}}</div>
              <div>￥ {{scope.row.price}}</div>
            </div>
          </div>

        </template>
      </el-table-column>


      <el-table-column align="center" min-width="100" label="订单编号" prop="orderSn"/>

      <el-table-column align="center" label="退款编号" prop="aftersaleSn"/>


      <el-table-column align="center" label="售后状态" prop="aftersaleStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.aftersaleStatus | aftersaleStatusFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="处理方式" prop="aftersaleStatus">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.type | aftersaTypeFilter }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请时间" prop="addTime"/>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">

          <el-button style="width: 80px" v-permission="['GET /admin/order/detail']" type="info" size="mini"
                     @click="handleDetail(scope.row)">订单详情
          </el-button>
          <el-button style="width: 80px" v-permission="['GET /admin/order/detail']" type="info" size="mini"
                     @click="afterDetail(scope.row)">售后详情
          </el-button>

          <div style="margin-top: 5px">
            <el-button v-if="scope.row.aftersaleStatus===1" style="width: 80px"
                       v-permission="['POST /admin/order/ship']" type="success" size="mini"
                       @click="refundBtn(scope.row)" :disabled="scope.row.auditing">确认退款
            </el-button>
            <el-button v-else style="width: 80px" v-permission="['POST /admin/order/ship']" type="success" size="mini"
                       @click="acceptApiBtn(scope.row)" :disabled="scope.row.auditing">受理
            </el-button>
            <el-button style="width: 80px" v-permission="['POST /admin/order/refund']" size="mini"
                       @click="RefusedBtn(scope.row)" :disabled="scope.row.auditing">拒绝
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <!-- 订单详情对话框 -->
    <el-dialog :visible.sync="orderDialogVisible" title="订单详情" width="800">

      <el-form :data="orderDetail" label-position="left">
        <el-form-item label="订单编号">
          <span>{{ orderDetail.order.orderSn }}</span>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-tag>{{ orderDetail.order.orderStatus | orderStatusFilter }}</el-tag>
        </el-form-item>
        <el-form-item label="订单用户">
          <span>{{ orderDetail.user.nickname }}</span>
        </el-form-item>
        <el-form-item label="用户留言">
          <span>{{ orderDetail.order.message }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>（收货人）{{ orderDetail.order.consignee }}</span>
          <span>（手机号）{{ orderDetail.order.mobile }}</span>
          <span>（地址）{{ orderDetail.order.address }}</span>
        </el-form-item>
        <el-form-item label="商品信息">
          <el-table :data="orderDetail.orderGoods" border fit highlight-current-row>
            <el-table-column align="center" label="商品名称" prop="goodsName"/>
            <el-table-column align="center" label="商品编号" prop="goodsSn"/>
            <el-table-column align="center" label="货品规格" prop="specifications"/>
            <el-table-column align="center" label="货品价格" prop="price"/>
            <el-table-column align="center" label="货品数量" prop="number"/>
            <el-table-column align="center" label="货品图片" prop="picUrl">
              <template slot-scope="scope">
                <img :src="scope.row.picUrl" width="40">
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="费用信息">
          <span>
            (实际费用){{ orderDetail.order.actualPrice }}元 =
            (商品总价){{ orderDetail.order.goodsPrice }}元 +
            (快递费用){{ orderDetail.order.freightPrice }}元 -
            (优惠减免){{ orderDetail.order.couponPrice }}元 -
            (积分减免){{ orderDetail.order.integralPrice }}元
          </span>
        </el-form-item>
        <el-form-item label="支付信息">
          <span>（支付渠道）微信支付</span>
          <span>（支付时间）{{ orderDetail.order.payTime }}</span>
        </el-form-item>
        <el-form-item label="快递信息">
          <span>（快递公司）{{ orderDetail.order.shipChannel }}</span>
          <span>（快递单号）{{ orderDetail.order.shipSn }}</span>
          <span>（发货时间）{{ orderDetail.order.shipTime }}</span>
        </el-form-item>
        <el-form-item label="收货信息">
          <span>（确认收货时间）{{ orderDetail.order.confirmTime }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>


    <!-- 售后详情对话框 -->
    <el-dialog :visible.sync="afterDialogVisible" title="售后详情" width="800">

      <div style="display: flex;justify-content: space-between;">
        <el-form :data="orderDetail" label-position="left">
          <el-form-item label="售后编号">
            <span>{{ afterDetaildata.aftersaleSn }}</span>
          </el-form-item>

          <el-form-item label="申请时间">
            <span>{{ afterDetaildata.addTime }}</span>
          </el-form-item>
          <el-form-item label="处理方式">
            <span>{{ afterDetaildata.type | aftersaTypeFilter }}</span>
          </el-form-item>
          <el-form-item label="售后原由">
            <span>{{ afterDetaildata.reason }}</span>
          </el-form-item>
          <el-form-item label="商品信息">
            <el-table :data="goodsArr" border fit highlight-current-row>
              <el-table-column align="center" label="商品名称" prop="goodsName"/>
              <el-table-column align="center" label="商品编号" prop="goodsSn"/>
              <el-table-column align="center" label="货品价格" prop="price"/>
              <el-table-column align="center" label="货品数量" prop="number"/>
              <el-table-column align="center" label="货品图片" prop="picUrl">
                <template slot-scope="scope">
                  <img :src="scope.row.picUrl" width="40">
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

        </el-form>
        <el-button style="height: 40px" v-if="refundbtnShow" type="primary" size="mini" @click="refundBtn(afterDetaildata)">退款</el-button>
      </div>

    </el-dialog>

    <!-- 发货对话框 -->
    <el-dialog :visible.sync="shipDialogVisible" title="发货">
      <el-form ref="shipForm" :model="shipForm" status-icon label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="快递公司" prop="shipChannel">
          <el-input v-model="shipForm.shipChannel"/>
        </el-form-item>
        <el-form-item label="快递编号" prop="shipSn">
          <el-input v-model="shipForm.shipSn"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="shipDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmShip">确定</el-button>
      </div>
    </el-dialog>

    <!-- 退款对话框 -->
    <el-dialog :visible.sync="refundDialogVisible" title="退款" width="500px">
      <el-form ref="refunData" :model="refunData"  status-icon label-position="left" label-width="100px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="退款金额" prop="refundAmount"
                      :rules="[
            { required: true, message: '必须填写', trigger: 'blur' }
           ]">
          <el-input v-model="refunData.refundAmount"  :max="refunData.price"
                    :placeholder="refunData.price"/>
        </el-form-item>
      </el-form>
      <!--      refundForm-->
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitFormafter('refunData')">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<style>

</style>

<script>
  import {
    listOrder,
    shipOrder,
    refundOrder,
    detailOrder,
    aftersaleList,
    aftersaledetail,
    refund,
    acceptApi
  } from '@/api/order'
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import checkPermission from '@/utils/permission' // 权限判断函数

  const statusMap = {
    101: '未付款',
    102: '用户取消',
    103: '系统取消',
    201: '已付款',
    202: '申请退款',
    203: '已退款',
    301: '已发货',
    401: '用户收货',
    402: '系统收货'
  }
  const aftersaleStatuIng = {
    1: '退款申请',
    2: '退款退货申请',
    3: '退款成功',
    4: '等待买家退货',
    5: '已收货，确认退款',
    6: '退款退货成功',
    7: '已拒绝',
    8: '已取消',
    9: '退款处理中',
    10: '维修申请',
    11: '已受理维修',
    12: '维修中',
    13: '维修成功'
  }

  const aftersaType = {
    1: '维修',
    2: '退款退货',
    3: '仅退款',
  }
  export default {
    name: 'after-sales',
    components: {Pagination},
    filters: {
      orderStatusFilter(status) {
        return statusMap[status]
      },
      aftersaleStatusFilter(status) {
        return aftersaleStatuIng[status]
      },
      aftersaTypeFilter(status) {
        return aftersaType[status]
      }
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        aftersaleStatuIng,//售后状态
        aftersaType,
        statusMapNew: [
          {
            label: '维修',
            value: '1'
          }, {
            label: '仅退款',
            value: '3'
          }, {
            label: '退货退款',
            value: '2'
          }
        ],
        listQuery: {
          page: 1,
          limit: 20,
          id: undefined,
          name: undefined,
          orderStatusArray: [],
          sort: 'add_time',
          order: 'desc',
          aftersaleSn: '',//售后编号
          status: null,//售后状态
          type: [],//处理方式

        },
        statusMap,
        orderDialogVisible: false,//订单详情
        afterDialogVisible: false,//售后详情
        orderDetail: {
          //订单详情
          order: {},
          user: {},
          orderGoods: []
        },
        afterDetaildata: {
          // 售后详情
          order: {},
          user: {},
          orderGoods: []
        },
        shipForm: {
          orderId: undefined,
          shipChannel: undefined,
          shipSn: undefined
        },
        shipDialogVisible: false,
        refundForm: {
          orderId: undefined,
          refundMoney: undefined
        },
        refundDialogVisible: false,//退款对话框
        downloadLoading: false,
        goodsArr: [],//商品信息列表
        refunData: {},//退款数据
        refundbtnShow:false,//退款详情退款按钮
      }
    },
    created() {
      // this.getList()
      this.aftersaleListQuery()
    },
    methods: {
      checkPermission,
      submitFormafter(refunData) {
        this.$refs[refunData].validate((valid) => {
          if (valid) {
            this.confirmRefund()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      refundBtn(data) {
        //确认退款
        console.log(data)
        this.refunData = data

        this.refundDialogVisible = true
        // this.$prompt('请输入退款金额', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        //   inputErrorMessage: '邮箱格式不正确'
        // }).then(() => {
        //   refund(data).then(res => {
        //     this.$notify.success({
        //       title: '成功',
        //       message: '操作成功'
        //     })
        //     this.this.aftersaleListQuery()
        //   }).catch(err => {
        //     console.log(err)
        //   })
        // })
      },
      acceptApiBtn(data) {
        //受理
        this.$confirm('是否受理当前售后申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newdata = data
          newdata.aftersaleStatus = 11
          newdata.auditing = true
          acceptApi(newdata).then(res => {
            this.$notify.success({
              title: '成功',
              message: '操作成功'
            })
            this.this.aftersaleListQuery()
          }).catch(err => {
            console.log(err)
          })
        })

      },
      RefusedBtn(data) {
        //拒绝售后申请

        this.$confirm('是否拒绝当前售后申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let newdata = data
          newdata.aftersaleStatus = 7
          newdata.auditing = true
          acceptApi(newdata).then(res => {
            this.$notify.success({
              title: '成功',
              message: '操作成功'
            })
            this.this.aftersaleListQuery()
          }).catch(err => {
            console.log(err)
          })
        })


      },
      getList() {
        this.listLoading = true
        listOrder(this.listQuery).then(response => {
          this.list = response.data.data.list
          this.total = response.data.data.total
          this.listLoading = false
        }).catch(() => {
          this.list = []
          this.total = 0
          this.listLoading = false
        })
      },
      aftersaleListQuery() {
        aftersaleList(this.listQuery).then(res => {
          console.log('售后列表')
          console.log(res)
          this.list = res.data.data.list
          this.total = res.data.data.total
          this.listLoading = false
        }).catch(err => {
          console.log(err)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },
      afterFilter() {
        this.listQuery.page = 1
        this.aftersaleListQuery()
      },
      handleDetail(row) {
        //订单详细
        detailOrder(row.orderId).then(response => {
          this.orderDetail = response.data.data
        })
        this.orderDialogVisible = true
        console.log(row.orderId)
      },
      afterDetail(row) {
        //售后详情
        aftersaledetail(row.id).then(response => {
          this.afterDetaildata = response.data.data

          let goods = {
            goodsName: this.afterDetaildata.goodsName,
            goodsSn: this.afterDetaildata.goodsSn,
            price: this.afterDetaildata.price,
            number: this.afterDetaildata.number,
            picUrl: this.afterDetaildata.picUrl,
          }
          this.goodsArr=[]
          this.goodsArr.push(goods)
        })
        if (row.auditing==true&&row.type==2){
          this.refundbtnShow=true
        } else {
          this.refundbtnShow=false
        }
        // refundbtnShow
        this.afterDialogVisible = true
      },
      handleShip(row) {
        this.shipForm.orderId = row.id
        this.shipForm.shipChannel = row.shipChannel
        this.shipForm.shipSn = row.shipSn

        this.shipDialogVisible = true
        this.$nextTick(() => {
          this.$refs['shipForm'].clearValidate()
        })
      },
      confirmShip() {
        this.$refs['shipForm'].validate((valid) => {
          if (valid) {
            shipOrder(this.shipForm).then(response => {
              this.shipDialogVisible = false
              this.$notify.success({
                title: '成功',
                message: '确认发货成功'
              })
              this.getList()
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
            })
          }
        })
      },
      handleRefund(row) {
        this.refundForm.orderId = row.id
        this.refundForm.refundMoney = row.actualPrice

        this.refundDialogVisible = true
        this.$nextTick(() => {
          this.$refs['refundForm'].clearValidate()
        })
      },
      confirmRefund(refunData) {
        //退款
        this.refunData.auditing = true
        refund(this.refunData).then(res => {
          this.$notify.success({
            title: '成功',
            message: '确认退款成功'
          })
          this.refundDialogVisible=false
          this.aftersaleListQuery()
        }).catch(err => {
          this.$notify.error({
            title: '失败',
            message: err.data.errmsg
          })
        })

      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['商品信息', '订单编号', '退款编号', '售后状态', '处理方式', '申请时间']
          const filterVal = ['picUrl', 'orderSn', 'aftersaleSn', 'aftersaleStatus', 'type', 'addTime']
          excel.export_json_to_excel2(tHeader, this.list, filterVal, '售后信息')
          this.downloadLoading = false
        })
      }
    }
  }
</script>
