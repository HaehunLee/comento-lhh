<template>
  <div id="app">
    <!-- bootstrap을 이용한 페이지 감싸기 -->
    <b-container>
      <b-row>
        <b-col cols="12">
          <router-view></router-view>
          <!-- 로딩 컴포넌트 전역처리 -->
          <Loading :show="showLoading"/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import EventBus from '@/modules/EventBus'

export default {
  name: 'App',
  components : { Loading },
  data() {
    return {
      showLoading : false,
    }
  },
  methods:{
    // 로딩 시작 함수
    startLoading(){                                          
      this.showLoading = true;
    },
    // 로딩 종료 함수
    endLoading(){
      this.showLoading = false;
    }
  },
  created(){
    // EventBus를 통해 전역적으로 함수를 이용할수 있게함.
    EventBus.$on('start:loading', this.startLoading);
    EventBus.$on('end:loading', this.endLoading);
  },
  // 이벤트 주시 해제
  beforeDestroy(){
    EventBus.$off('start:loading');
    EventBus.$off('end:loading');
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loader-wrapper { 
  right : 45% !important;
  bottom : 50% !important;
}
</style>
