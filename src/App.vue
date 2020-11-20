<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div> -->
  <router-view/>
</template>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
#app {
    width: 100%;
    height: 100%;
    font-family: Micrososfe Yahei;
    min-width: 320px;
    margin: 0 auto!important;
    padding: 0 auto!important;
    background-color: #F5F5F5;
}
html, body{
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #EDEDED;
}
*{
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
}
a{
    text-decoration: none;
}
li{
    list-style: none;
}
</style>
