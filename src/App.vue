<template>
<div id="app">
  <div id='left-panel' class="col-md-4">
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

    <div id='right-panel' class="col-md-10">
      <!-- 地圖 -->
      <div>
        <div id="map"></div>
      </div>
    </div>

</div>
</template>

<script>
let openStreetMap={};
import cityName from './assets/taiwan-zip-code.json';
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
    openStreetMap=L.map('map',{
      trackResize: false,
      center: [25.042474, 121.513729],
      zoom:15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 19,
    }).addTo(openStreetMap);
  },
  computed:{
    get_Pharmacies(){
      let pharmacies= this.data.filter((pharmacy)=>{
        if(!this.select.area){
          return pharmacy.properties.county === this.select.city;
        }
        return pharmacy.properties.town === this.select.area;
      });
      return pharmacies;
    },
  },
  //監聽
  watch:{
    get_Pharmacies(value){
      console.log(value);
    }
  }
};
</script>

<style lang="scss">
  @import 'bootstrap/scss/bootstrap';

  #map{
  position: relative;
  height: 100vh;
  }
  $left-w: 200px;
  #left-panel{
    position: relative;
    float:left;
    width: $left-w;
    height:100vh;
  }

  #right-panel{
    position: relative;
    float:right;
    height:100vh;
}
</style>
