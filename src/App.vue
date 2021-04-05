<template>
<div id="app">
  <!-- <div class='row no-gutters'></div> -->
  <div>
    <!-- 左 -->
    <div>
        <label>縣市</label>
        <select id='city_name' v-model="select.city">
          <option value="">請選擇縣市</option>
          <option :value="c.name" v-for="c in cityName.cities" :key="c.name">
            {{c.name}}
          </option>
        </select>
    </div>
      
    <div>
        <label>地區</label>
        <select id='area' v-model="select.area">
          <option value="">請選擇區域</option>
          <option :value="a.name" v-for="a in cityName.cities.find((city) => city.name === select.city).region" :key="a.name">
            {{a.name}}
          </option>
        </select>
    </div>
      
  </div>

    <div>
      <!-- 地圖 -->
      <div>
        <div id="map"></div>
      </div>
    </div>

</div>
</template>

<script>
import cityName from './assets/taiwan-zip-code.json';
let that=this;
export default {
  name: 'App',
  data:()=>({
    cityName,
    data:[],
    select:{
      city:'台北市',
      area:'中山區',
    },
  }),
  components: {
  },
  mounted(){
    const api = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
    this.axios.get(api).then((response) => {
      this.data=response.data.features;
    });
  },
};
</script>

<style lang="scss">
  @import 'bootstrap/scss/bootstrap';

  #map{
  position: relative;
  height: 100vh;
  }
</style>
