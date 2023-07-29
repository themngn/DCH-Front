<template>
    <CreateCharacter @close="showCreation = false" v-if="showCreation" :username="username" @create="createCharacter">
    </CreateCharacter>
    <PictureChange @close="showPictureChange = false" v-if="showPictureChange" :username="username"
        v-bind:characterPictureId="characterPictureId" :characterId="characterId" @create="createCharacter"></PictureChange>
    <div class="bg">
        <h1>Select Character</h1>
        <ol>
            <li class="character-box" v-for="character in characters">
                <div class="character-portrait-top">
                    <Portrait @click="changePicture(character.id, character.portraitId)" class="character-portrait"
                        :id="character.portraitId">
                    </Portrait>
                    <div class="character-info">
                        <div class="character-line">
                            <h3>{{ character.name }}</h3>
                            <h3>Class: {{ character.data.class }}</h3>

                        </div>
                        <div class="chraacter-line">
                            <h3>Race: {{ character.data.race }}</h3>
                            <h3>Level: {{ character.data.level }}</h3>
                        </div>
                    </div>
                </div>
                <div class="character-box-bottom">
                    <router-link class="play-button" :to="'/character-sheet/' + character.id">Play</router-link>
                    <button class="play-button" @click="deleteCharacter(character.id)">Delete</button>
                </div>

            </li>
            <li class="new">
                <button class="play-button new-button" @click="showCreation = true">Create Character</button>
            </li>
        </ol>
    </div>
</template>


<script>
import CreateCharacter from './CreateCharacter.vue'
import Portrait from './Portrait.vue';
import PictureChange from './PictureChange.vue';

export default {
    name: 'SelectCharacter',
    components: {
        CreateCharacter,
        Portrait,
        PictureChange

    },
    data() {
        return {
            username: '',
            id: -1,
            characters: [],
            token: '',
            showCreation: false,
            url: '',
            showPictureChange: false,
            characterId: -1,
            characterPictureId: -1

        }
    },
    methods: {
        getUserName() {
            if (localStorage.getItem('token') === null) {
                console.log("no token")

            } else {
                this.token = localStorage.getItem('token')

                this.url = window.location.href.split(':8080')[0]
                fetch(this.url + ':1290/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token

                    }
                }).then(res => res.json())
                    .then(data => {
                        this.username = data.username
                        localStorage.setItem("username", this.username)
                        this.id = data.id
                        this.getCharacterList()
                    })
            }
        },
        getCharacterList() {
            this.url = window.location.href.split(':8080')[0]
            fetch(this.url + ':1290/characters/for-user/' + this.id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin': '*'
                }
            }).then(res => res.json())
                .then(data => {
                    this.characters = data
                })

        },
        deleteCharacter(id) {
            fetch(this.url + ':1290/characters/' + id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin': '*'
                },
            }).then(res => res.json())
                .then(data => {
                    this.getCharacterList()
                    this.$emit('update')
                    this.$forceUpdate()

                })


        },
        createCharacter(name) {
            this.showCreation = false
            this.url = window.location.href.split(':8080')[0]
            fetch(this.url + ':1290/characters', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    name: name,
                    paramMap: {
                        inventory1: [],
                        skills: {},
                        abillityScores: {
                            "Strength": 10,
                            "Dexterity": 10,
                            "Constitution": 10,
                            "Intelligence": 10,
                            "Wisdom": 10,
                            "Charisma": 10
                        }, "abilitiesProficiency": {
                            "Strength": false,
                            "Dexterity": false,
                            "Constitution": false,
                            "Intelligence": false,
                            "Wisdom": true,
                            "Charisma": true
                        }
                    },
                    data: {
                        level: 0,
                        race: '',
                        class: ''
                    },
                    portraitId: 3

                })
            }).then(res => res.json())
                .then(data => {
                    this.getCharacterList();
                    this.$forceUpdate();
                    this.$emit('update')
                    this.$router.push('/character-sheet/' + data.id)
                }
                )

        },
        changePicture(id, portraitId) {
            console.log(id)
            this.characterId = id
            this.characterPictureId = portraitId
            this.showPictureChange = true;
            this.token = localStorage.getItem('token')
            this.url = window.location.href.split(':8080')[0]



        }

    },

    mounted() {
        this.getUserName()
    },
    watch: {
        showPictureChange: function (newVal) {
            if (newVal === false) {
                this.getCharacterList()
            }
        }
    }

}

</script>

<style scoped>
.bg {
    padding: 0;
    margin: 0;
}

ol {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

li {
    width: 500px;
    height: 150px;
    margin: 15px;
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.new-button {
    margin: auto;
}

.new {
    display: flex;
}

.character-portrait-top {
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 100px;
}

.character-box-bottom {
    width: 500px;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
}

.character-portrait {
    width: 75px;
    height: 75px;
    margin: auto;
    border-radius: 5%;
    border: 1px solid white;
    cursor: pointer;
}

.character-info {
    width: 400px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
}

@media only screen and (max-width: 525px) {
    li {
        width: 80vw;
        height: 60vw;
    }

    .character-box-bottom {
        width: 80vw;
        height: 15vw;
    }

    .character-portrait-top {
        width: 80vw;
        height: 45vw;
    }

    .character-line {
        width: 80vw;
        height: 20vw;
    }
}
</style>