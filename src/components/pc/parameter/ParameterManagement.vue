<template>
  <div id="parameter-managerment-root">
    <el-row id="parameter-managerment-controller-row">
      <el-button @click="listParameter" class="controller-item">刷新</el-button>
      <el-button class="controller-item" @click="add">添加参数</el-button>
      <el-select v-model="query.application" placeholder="按应用筛选" @change="listParameter" class="controller-item">
        <el-option key="application-all" label="全部" value=""></el-option>
        <el-option v-for="item in filter.application" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input placeholder="请输入参数 KEY 进行查询" v-model="query.key" class="parameter-search-key" clearable>
        <el-button slot="append" icon="el-icon-search" @click="listParameter"></el-button>
      </el-input>
    </el-row>
    <el-row id="parameter-managerment-tb-row">
      <el-table :data="parameterList" :height="table.height" border style="width: 100%" v-loading="table.loading">
        <el-table-column prop="application" label="服务" width="200"></el-table-column>
        <el-table-column prop="key" label="参数名" width="250"></el-table-column>
        <el-table-column label="参数值" >
          <template slot-scope="scope">
            <div v-for="(list, env, index) in scope.row.active" :key="getParameterDivKey(scope.row, index)" style="margin: .5rem;">
              <el-row type="flex" align="middle">
                <el-col :span="2">
                  <el-tag :key="env" effect="plain" style="width: 75%; text-align: center;">
                    {{ env }}
                  </el-tag>
                </el-col>
                <el-col :span="14">
                  <div v-for="item in list" :key="item.parameterId" class="parameter-value-box">
                    {{ item.value }}
                  </div>
                </el-col>
                <el-col :span="8" style="text-align: center;">
                  <el-button type="success" size="small" plain disabled>刷新缓存</el-button>
                  <el-button type="warning" size="small" plain @click="edit(scope.row.application, scope.row.key, env)">编辑</el-button>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row id="parameter-edit-row">
      <parameter-edit ref="paramterEdit" @listParameter="listParameter"/>
    </el-row>
  </div>
</template>

<script>
import ParameterEdit from "@/components/pc/parameter/ParameterEdit.vue";

export default {
  name: "ParameterManagement",
  components: {
    ParameterEdit
  },
  data() {
    return {
      query: {
        application: '',
        active: '',
        key: ''
      },
      filter: {
        application: []
      },
      parameterList: [],
      table: {
        height: 0,
        loading: false
      }
    }
  },
  methods: {
    listParameter() {
      this.parameterList.length = 0;
      this.table.loading = true;
      this.$api.prophetParameter.listParameter(this.query).then(data => {
        this.parameterList = data;
        this.table.loading = false;
      })
    },
    getParameterDivKey(param, index) {
      return `${param.application}-${param.key}-${index}`;
    },
    listApplication() {
      this.filter.application.length = 0;
      this.$api.prophetApplication.listApplication().then(data => {
        this.filter.application = data;
      })
    },
    edit(application, key, active) {
      this.$refs.paramterEdit.model = 'edit';
      this.$refs.paramterEdit.info = {
        application: application,
        key: key,
        active: active,
        value: []
      };
      this.$refs.paramterEdit.show();
    },
    add() {
      this.$refs.paramterEdit.model = 'add';
      this.$refs.paramterEdit.info = {
        application: '',
        key: '',
        active: '',
        value: []
      };
      this.$refs.paramterEdit.show();
    }
  },
  created() {
    this.listParameter();
    this.listApplication();
    this.table.height = window.innerHeight * 0.8;
  }
}
</script>

<style scoped>
#parameter-managerment-root {
  padding: .5rem;
}

#parameter-managerment-tb-row {
  padding: .5rem;
}

#parameter-managerment-controller-row {
  padding: .5rem;
}

.parameter-value-box {
  background-color: #d3d3d35c;
  border-radius: 5px;
  padding: .25rem 1rem;
  margin: .25rem;
  width: fit-content;
}

.controller-item {
  margin: 0 1rem 0 0;
}

.parameter-search-key {
  width: 25rem;
}
</style>
