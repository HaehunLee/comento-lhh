<template>
  <div id="app">
    <!-- bootstrap을 이용한 페이지 감싸기 -->
    <b-container>
      <b-row>
        <b-col cols="12">
          <!-- router과제에선 사용할 일이 없음. -->
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App'
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
</style>
