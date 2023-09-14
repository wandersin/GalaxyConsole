<template>
  <el-dialog title="参数管理" :visible.sync="flag" width="70%" @close="refreshTable">
    <el-row>
      <el-select v-model="info.application" placeholder="请选择应用" :disabled="model === 'edit'" class="parameter-edit-controller-item">
        <el-option v-for="item in application" :key="'edit-' + item" :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="info.key" placeholder="请选择关键字" :disabled="model === 'edit'" class="parameter-edit-controller-item">
        <el-option v-for="item in key" :key="'edit-' + item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="info.active" placeholder="请输入环境代码" :disabled="model === 'edit'" clearable class="parameter-edit-controller-item"></el-input>
    </el-row>
    <el-row style="margin: 1rem 0;">
      <el-button plain @click="addParameter">添加参数值</el-button>
    </el-row>
    <el-row>
      <el-table :data="info.value" border style="width: 100%">
        <el-table-column prop="parameterId" label="id" width="300"></el-table-column>
        <el-table-column label="参数值">
          <template slot-scope="scope">
            <el-input v-show="scope.row.edit" v-model="scope.row.value" size="small">编辑</el-input>
            <span v-show="!scope.row.edit">{{ scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.createdTime | dataFormat('YYYY-MM-DD hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后修改" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.updatedTime | dataFormat('YYYY-MM-DD hh:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button class="parameter-edit-operation-btn" v-show="!scope.row.edit" type="primary" size="small" plain @click="editParameter(scope.row)" disabled>修改</el-button>
            <el-button class="parameter-edit-operation-btn" v-show="scope.row.edit && !scope.row.new" type="primary" size="small" plain @click="saveEdit(scope.row)" disabled>保存</el-button>
            <el-button class="parameter-edit-operation-btn" v-show="scope.row.new" type="primary" size="small" plain @click="saveAdd(scope.row)">新增</el-button>
            <el-button class="parameter-edit-operation-btn" type="danger" size="small" plain @click="deleteParameter(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-dialog>
</template>

<script>
import Vue from "vue";

export default {
  name: "ParameterEdit",
  components: {},
  data() {
    return {
      flag: false,
      model: '',
      parameter: {
        application: '',
        key: '',
        active: ''
      },
      application: [],
      key: [],
      info: {
        active: '',
        application: '',
        key: '',
        value: []
      }
    }
  },
  methods: {
    show() {
      this.flag = true;
      this.listApplication();
      this.listParameterKey();
      if (this.model === 'edit') {
        this.refreshInfo();
      }
    },
    hide() {
      this.flag = false;
    },
    refreshTable() {
      this.$emit('listParameter');
    },
    // 刷新参数信息
    refreshInfo() {
      this.$api.prophetParameter.getParameter({
        application: this.info.application,
        key: this.info.key,
        active: this.info.active
      }).then(data => {
        this.info = data;
      }).catch(() => {
        this.info.value = [];
      })
    },
    listApplication() {
      this.application.length = 0;
      this.$api.prophetApplication.listApplication().then(data => {
        this.application = data;
      })
    },
    listParameterKey() {
      this.key.length = 0;
      this.$api.prophetParameter.listKey().then(data => {
        this.key = data;
      })
    },
    addParameter() {
      this.info.value.push({
        parameterId: '<default>',
        edit: true,
        new: true
      })
    },
    deleteParameter(row, index) {
      if (row.new && row.edit) {
        // 取消新增参数, 可以直接删除
        this.info.value.splice(index, 1);
        return;
      }
      // 删除已有参数, 调用删除接口
      let id = row.parameterId;
      this.$confirm(`即将删除参数${id}, 此操作无法恢复, 是否继续`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let arr = [];
        arr.push(id);
        this.$api.prophetParameter.delete(arr).then(() => {
          this.refreshInfo();
          this.$message.success('删除参数成功');
        })
      });
    },
    editParameter(item) {
      Vue.set(item, 'edit', true);
    },
    saveEdit(item) {
      Vue.set(item, 'edit', false);
    },
    saveAdd(row) {
      if (!row.new || !row.edit) {
        this.$message.error('参数状态有误, 请刷新页面重试');
        return;
      }
      if (this.$commonUtils.isEmpty(row.value)) {
        this.$message.error('参数值不能为空');
        return;
      }
      let body = [];
      let param = {
        application: this.info.application,
        active: this.info.active,
        key: this.info.key,
        value: []
      }
      param.value.push(row.value);
      body.push(param);
      this.$api.prophetParameter.add(body).then(() => {
        this.refreshInfo();
        this.$message.success('参数添加成功');
      })
    }
  }
}
</script>

<style scoped>
.parameter-edit-controller-item {
  width: 15rem;
  margin-right: 1rem;
}

.parameter-edit-operation-btn {
  margin: 0 .5rem;
}
</style>
