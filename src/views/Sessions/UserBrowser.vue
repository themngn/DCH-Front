<template>
    <input @input="getUsersList" v-model="search" type="text">
    <ol>
        <li v-for="user in users" v-bind:key="user.id" @click="goToUserPage(user.id)">
            {{ user.username }}
        </li>
    </ol>
</template>
<script>
export default {
    name: 'UserBrowser',
    components: {

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
<style scoped></style>