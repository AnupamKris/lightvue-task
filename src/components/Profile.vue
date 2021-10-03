<template>
  <div class="profile">
    <div class="info">
      <img :src="profileData.avatar_url" alt="" />
      <span>
        <h3>{{ profileData.name }}</h3>
        <h4>{{ profileData.login }}</h4>
        <div class="people">
          <i class="fa fa-users"></i>
          {{ profileData.followers }} followers ·
          {{ profileData.following }}
          following
        </div>
        <h4>{{ profileData.bio }}</h4>
        <h4><i class="fa fa-map-marker-alt"></i> {{ profileData.location }}</h4>
      </span>
    </div>
    <div class="repositories">
      <h1>Repositories</h1>
      <span class="sep"></span>
      <div class="repos">
        <span v-for="item in repos" :key="item.id">
          <p>{{ item.name }}</p>
          <div class="info">
            <div class="lang">Language : {{ item.language }}</div>
            <a
              :href="
                'https://github.com/' + profileData.login + '/' + item.name
              "
            >
              <i class="fa fa-link"></i>
            </a>
          </div>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    profileData: Object,
    repos: Object,
  },
  setup(props) {
    console.log("there", props.profileData);
    return {};
  },
};
</script>

<style lang="less" scoped>
.profile {
  //   overflow: auto;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .info {
    width: 400px;
    height: 600px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    img {
      width: 300px;
      height: 300px;
      border-radius: 150px;
    }
    span {
      height: 200px;
      width: 90%;
      border: 2px solid #2c3551;
      border-radius: 20px;
      display: flex;
      align-items: center;
      flex-direction: column;
      h3 {
        margin: 10px 0 5px 0;
        width: 90%;
        text-align: left;
      }
      h4 {
        width: 90%;
        margin: 2px 0;
        text-align: left;
        font-weight: 200;
      }
      .people {
        margin: 5px 0;
        width: 90%;
        text-align: left;
      }
    }
  }
  .repositories {
    margin-top: 10px;
    width: calc(100% - 400px);
    height: auto;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    h1 {
      text-align: left;
      color: #ffffff;
    }
    .sep {
      width: calc(100% - 10px);
      background: #6c7591;
      height: 2px;
    }

    .repos {
      display: flex;
      width: calc(100% - 10px);

      justify-content: space-evenly;

      flex-wrap: wrap;
      overflow: visible;
      h1 {
        width: 300px;
        height: 100px;
        display: flex;
        //   justify-content: center;
        align-items: center;
      }
      span {
        width: 300px;
        margin: 10px 5px 5px 0;
        max-height: 100px;
        min-height: 100px;
        border-radius: 20px;
        border: 1px solid #2c3551;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        overflow: hidden;

        p {
          width: 100%;
          height: 40px;
          background: #181d2c;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .info {
          display: flex;
          justify-content: space-around;
          align-items: center;
          flex-direction: row;
          width: 100%;
          height: 60px;
          .lang {
            width: 55%;
          }
          a {
            text-decoration: none;
            color: #6c7591;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 600px) {
  .profile {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    scrollbar-width: none;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    .info {
      width: 90%;
      min-height: 400px;
      img {
        width: 150px;
        height: 150px;
      }
      span {
        height: 200px;
      }
    }
    .repositories {
      width: 100%;
      align-items: center;
      h1,
      .sep {
        width: calc(100% - 60px);
      }

      .repos {
        width: 90%;
        height: auto;
        overflow: visible;
        span {
          width: 100%;
          .info {
            min-height: 60px;
          }
        }
      }
    }
  }
}
</style>