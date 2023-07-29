<template>
  <Transition class="fade">
    <nav v-if="showNavBar">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="username == 'monogon'" to="/test">Test</router-link><span v-if="username == 'monogon'">|</span>
      <!-- <router-link to="/sessions" v-if="token">Sessions</router-link><span v-if="token">|</span> -->
      <router-link to="/user-browser" v-if="token">UserBrowser</router-link><span v-if="token">|</span>
      <router-link to="/select-character" v-if="token">Characters</router-link><span v-if="token">|</span>
      <router-link class="login" to="/me" v-if="token">
        <Portrait :id="portraitId" class="portrait" />{{ username }}
      </router-link>
      <router-link to="/me" v-else>Login</router-link>
    </nav>
  </Transition>
  <router-view @update="update" />
  <div @click="toggleNavBar" class="hide-button" style="">
    <img v-if="showNavBar" class="hide-icon" src="./assets/hide.png" alt="">
    <img v-else class="hide-icon" src="./assets/view.png" alt="">
  </div>
</template>

<script>
import Portrait from "./views/Portrait.vue";

export default {
  name: "App",
  data() {
    return {
      showNavBar: true,
      token: localStorage.getItem("token"),
      username: localStorage.getItem("username"),
      id: localStorage.getItem("id"),
      portraitId: localStorage.getItem("portraitId")
    };
  },
  components: {
    Portrait,
  },
  methods: {
    toggleNavBar() {
      this.showNavBar = !this.showNavBar;
    },
    update() {
      this.token = localStorage.getItem("token");
      this.username = localStorage.getItem("username")
      if (window.location.href.split('/')[3] != 'character-sheet') {
        document.querySelector('link[rel="icon"]').href = '/favicon.ico'
        document.title = 'D&D Character Helper'
      }

    },
    checkToken() {
      this.token = localStorage.getItem('token')
      this.url = window.location.href.split(':8080')[0]

      fetch(this.url + ':1290/check-token', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      }).then(res => {
        return res.json()
      }).then(data => {
      }).catch((error) => {
        console.log(error)
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.token = ''
        this.username = ''
      })

    },
    getPortraidID() {
      this.url = window.location.href.split(':8080')[0]
      this.token = localStorage.getItem('token')
      fetch(this.url + ":1290/users/me", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.token
        }
      }).then(res => res.json())
        .then(data => {
          this.portraitId = data.portraitId
        })

    }
  }, beforeMount() {
    this.checkToken()
    if (this.token) {
      this.getPortraidID()
    }
  }
  , mounted() {

    this.timer = setInterval(() => {
      this.update()
    }, 100)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }

};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white
}

body,
html {
  margin: 0;
  padding: 0;
  background-color: #222;
}

nav {
  padding: 5px;
  margin: 0;
  background-image: linear-gradient(90deg, rgba(32, 32, 32, 1) 0%, rgba(0, 195, 94, 1) 25%, #00c35e 75%, rgba(32, 32, 32, 1) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

nav a {
  transition: all 0.2s ease-in-out;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 7.5px;
  margin: auto 10px;
  border-radius: 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  background-color: #222;
  color: #fff;
}

.hide-button {
  cursor: pointer;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  width: 50px;
  height: 50px;
}

.hide-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
}

.fade-enter-active {
  transition: opacity .5s
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.5s ease;
  transition: margin 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(1, 0);
  margin: 0 0 -50px 0;
}


.portrait {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 10px;
}

.login {
  display: flex;
  align-items: center;

}

/* ===== Scrollbar CSS ===== */
/* Firefox */
* {
  scrollbar-width: auto;
  scrollbar-color: #1f1f1f #ffffff;
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 16px;
}

*::-webkit-scrollbar-track {
  background: #444;
}

*::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 10px;
  border: 3px solid #444;
}

@media only screen and (max-width: 800px) {
  nav {
    background-color: #00c35e;
    background-image: none;
  }



  html,
  body,
  router-view {
    width: 100vw;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  router-view {
    width: 100vw;
    margin: 0;
  }

  tamplate {
    width: 100vw;
    margin: 0;
  }
}

@media only screen and (max-width: 625px) {
  .hide-button {
    display: none;
  }
}
</style>
