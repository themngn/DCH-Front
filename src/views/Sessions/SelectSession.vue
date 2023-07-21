<template>
    <div class="bg">
        <h1>Select Character</h1>
        <ol>
            <li v-for="session in sessions">
                <h2>{{ session.name }}</h2>
                <router-link class="play-button" :to="'/session/' + session.id">Characters</router-link>
                <button class="play-button" @click="deleteSession(session.id)">Delete</button>
            </li>
            <li class="new">
                <button class="play-button new-button" @click="showCreation = true">Create Session</button>
            </li>
        </ol>
    </div>
</template>
<script>
export default {
    name: 'Sesions',
    components: {

    },
    data() {
        return {
            url: window.location.href.split(':8080')[0],
            token: localStorage.getItem('token'),
            username: '',
            sessions: [],
            showCreation: false

        }
    },
    methods: {


    }, mounted() {

    }
}
</script>
<style scoped>
ol {
    padding: auto;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
}

li {
    width: 500px;
    height: 150px;
    margin: 15px auto;
    background-color: #333;
    list-style: none;
    border-radius: 15px;
    padding: 15px;
    color: white;
}

li a {
    color: white;
    text-decoration: none;
}

.play-button {
    background-color: #333;
    border: 1px solid white;
    border-radius: 5px;
    padding: 5px;
    color: white;
    text-decoration: none;
    margin: 5px;
    font-size: x-large;
}

.new-button {
    margin: auto;
}

.new {
    display: flex;
}
</style>