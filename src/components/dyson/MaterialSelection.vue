<template>
  <table>
    <tr v-for="(row, rowIndex) in materialList" :key="rowIndex">
      <td v-for="(item, itemIndex) in row" :key="itemIndex">
        <template v-if="item != null">
          <div class="img-box" @click="selectCallback(item.id)">
            <el-image :src="item.img"></el-image>
          </div>
        </template>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "MaterialSelection",
  data() {
    return {
      materialList: []
    }
  },
  methods: {
    // 加载材料信息
    loadMaterial(building) {
      this.$commonUtils.get(`${this.$dsp_baseUrl}/material/query-selection-data?building=${building}`, data => {
        this.materialList = data;
      })
    }
  },
  created() {
    this.loadMaterial(false);
  },
  props: {
    selectCallback: Function
  }
}
</script>

<style scoped>
table {
  background-color: lightcyan;
}

td {
  border: 1px solid lightskyblue;
  height: 2.5rem;
  width: 2.5rem;
  text-align: center;
  background-color: white;
}

el-image {
  width: 2.5rem;
  height: 2.5rem;
}

.img-box:hover {
  cursor: pointer;
  background-color: #e3f0fb;
}
</style>
