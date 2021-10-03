<template>
  <div class="home">
    <search-bar
      @get-profile="getProfile"
      @get-results="getResults"
    ></search-bar>

    <div class="results" v-if="searchResults">
      <user-profile
        v-for="(item, key) in searchResults"
        :key="item.id"
        :data="item"
        @get-profile="getProfile"
      ></user-profile>
    </div>
    <div class="profile" v-if="Object.keys(profileData).includes('followers')">
      <profile-view :profileData="profileData" :repos="repos"> </profile-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";

export default {
  name: "Home",
  components: {},
  emits: ["get-profile", "get-results"],
  setup() {
    const store = useStore();
    const profileData = ref("");
    const searchResults = ref("");
    const repos = ref("");
    const accessToken = ref("");

    const getProfile = async (user) => {
      searchResults.value = "";
      profileData.value = user;
      console.log("here ia am ", profileData.value.login);
      const res = await fetch(profileData.value.repos_url, {
        headers: {
          Authorization: store.state.accessToken,
        },
      });
      repos.value = await res.json();

      const profres = await fetch(profileData.value.url, {
        headers: {
          Authorization: store.state.accesstoken,
        },
      });
      profileData.value = await profres.json();
      console.log("PROFILE UPDATESD", profileData.value);
    };

    const getResults = (users) => {
      profileData.value = "";
      console.log(users);
      searchResults.value = users.items;
    };

    return {
      getProfile,
      getResults,

      searchResults,
      profileData,
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
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  .results {
    margin-top: 5px;
    height: 100%;
    width: 100%;
    overflow: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .profile {
    height: 100%;
    width: 100%;
    overflow: auto;
  }
}
@media only screen and (max-width: 600px) {
  .home {
    .profile {
      overflow: auto;
    }
  }
}
</style>