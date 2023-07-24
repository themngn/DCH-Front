<template>
    <input @input="getUsersList" v-model="search" type="text">
    <ol class="list">
        <li class="user" v-for="user in users" v-bind:key="user.id" @click="goToUserPage(user.id)">
            {{ user.username }}
            {{ user.portraitId }}
            <Portrait :id="user.portraitId" class="portrait" />
        </li>
    </ol>
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
    margin: 15px;
    float: right;
}

.user {
    width: 500px;
    height: 150px;
    margin: 15px auto;
    background-color: #333;
    list-style: none;
    border-radius: 15px;
    padding: 15px;
    color: white;
}
.list{
    width: 100%;
    margin: 15px auto;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
}

</style>