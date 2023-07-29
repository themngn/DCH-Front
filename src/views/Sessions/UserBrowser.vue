<template>
    <input class="search" @input="getUsersList" v-model="search" type="text" placeholder="Search">
    <ol class="list">
        <li class="user" v-for="user in users" v-bind:key="user.id" @click="goToUserPage(user.id)">
            <h2 class="username">{{ user.username }}</h2>
            <Portrait :id="user.portraitId" class="portrait" />
        </li>
    </ol>
    <div v-if="users.length == 0">
        <h1>No users found</h1>
    </div>
</template>
<script>
import Portrait from '../Portrait.vue'

export default {
    name: 'UserBrowser',
    components: {
        Portrait

    },
    data() {
        return {
            url: window.location.href.split(':8080')[0],
            token: localStorage.getItem('token'),
            users: [],
            search: "",
        }
    },
    methods: {


        getUsersList() {
            this.token = localStorage.getItem('token')
            console.log(this.url + `:1290/users/find?username=${this.search}&count=10&page=0`)
            console.log(this.token)
            fetch(this.url + `:1290/users/find?username=${this.search}&count=10&page=0`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.users = data
                })


        },
        goToUserPage(id) {
            this.$router.push(`/user/${id}`)
        }

    }, mounted() {
        this.getUsersList()
    }
}
</script>
<style scoped>
.portrait {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #333;
    margin: auto 5px;
    float: right;

}

.user {
    width: 400px;
    height: 100px;
    margin: 15px 15px;
    background-color: #333;
    list-style: none;
    border-radius: 15px;
    padding: 15px;
    color: white;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
}

.list {
    width: 100%;
    margin: 15px auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.search {
    width: 350px;
    height: 25px;
    margin: 15px auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    font-size: 20px;
    border-radius: 15px;
    border: 3px solid #222;
    padding: 15px;
    color: white;
    background-color: #333;
    outline: none;
}

.username {
    margin: auto;
}

@media only screen and (max-width: 525px) {

    .search {
        width: 80vw;
        height: 10vw;
        margin: 5vw;
    }

}
</style>