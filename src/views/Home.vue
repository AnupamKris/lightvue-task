<template>
  <div class="home">
    <search-bar @get-profile="getProfile"></search-bar>
    <div class="profile" v-if="data">
      <img :src="data.avatar_url" alt="" />
      <h3>
        {{ data.login }}
      </h3>
      <div class="repos">
        <h5 v-for="item in repos" :key="item.id">{{ item.name }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { ref } from "@vue/reactivity";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  emits: ["get-profile"],
  setup() {
    const data = ref("");
    const repos = ref("");
    const getProfile = async (user) => {
      data.value = user;

      const res = await fetch(data.value.repos_url);
      repos.value = await res.json();
      console.log(repos.value);

      // window.open("https://github.com/" + user.login, "_blank");
    };
    return {
      getProfile,
      data,
      repos,
    };
  },
};
</script>

<style scoped lang="less">
.home {
  // background: url("../assets/svgs/waveLayered.svg");
  // background-repeat: no-repeat;
  // background-position: bottom;
  background: #0a0d16;
  height: 100%;
  width: 100%;
}

.profile {
  img {
    width: 300px;
    height: 300px;
    border-radius: 150px;
  }
}
</style>