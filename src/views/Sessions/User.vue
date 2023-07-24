<template>
    <ol class="characters">
        <li v-for="character in characters" v-bind:key="character.id">
            <h2>{{ character.name }}</h2>
            <h3>Level: {{ character.level }}; Id: {{ character.id }}</h3>
            <router-link class="play-button" :to="'/character-sheet/' + character.id">Play</router-link>
            <button class="play-button" @click="addToSesion(character.id)">Add To Session</button>
        </li>
    </ol>
</template>
<script>
export default {
    name: 'User',
    components: {

    },
    data() {
        return {
            url: window.location.href.split(':8080')[0],
            token: localStorage.getItem('token'),
            username: '',
            id: this.$route.params.id,
            characters: [],
            currentSession: -1,
        }
    },
    methods: {
        goToCharacterPage(id) {
            this.$router.push(`/character-sheet/${id}`)
        },
        getCharacterList() {
            this.token = localStorage.getItem('token')
            fetch(this.url + `:1290/characters/for-user/${this.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                }
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.characters = data
                })
        },
        addToSesion(characterId) {
            this.currentSession = localStorage.getItem('currentSession')
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            if (this.currentSession === null) {
                this.currentSession = -1
            }
            if (this.currentSession === -1) {

                this.$router.push(`/sessions`)
            } else {
                fetch(this.url + `:1290/sessions/add-character/${this.currentSession}?characterId=${characterId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token,
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        this.$router.push(`/sessions`)
                    })

            }
        }
    }, mounted() {
        this.getCharacterList()

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
</style>