<template>
    <ol class="characters">
        <li class="character-box" v-for="character in characters">
            <div class="character-portrait-top">
                <Portrait class="character-portrait" :id="character.portraitId"></Portrait>
                <div class="character-info">
                    <div class="character-line">
                        <h3>{{ character.name }}</h3>
                        <h3>Class: {{ character.data.class }}</h3>

                    </div>
                    <div class="character-line">
                        <h3>Race: {{ character.data.race }}</h3>
                        <h3>Level: {{ character.data.level }}</h3>
                    </div>
                </div>
            </div>
            <div class="character-box-bottom">
                <router-link class="play-button" :to="'/character-sheet/' + character.id">Play</router-link>
                <button class="play-button" @click="requestOwnerShip(character.id)">Request ownership</button>
            </div>
        </li>
    </ol>
    <div v-if="characters.length == 0">
        <h1>This user has no characters</h1>
    </div>
</template>
<script>
import Portrait from '../Portrait.vue';
export default {
    name: 'User',
    components: {
        Portrait

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
        requestOwnerShip(characterId) {
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(this.url + `:1290/characters/owners/requests`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({
                    characterId: characterId,
                    ownerId: this.id
                })
            })
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

    ol {
        padding: 0;
        margin: 0;
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

@media only screen and (max-width: 400px) {
    .play-button {
        font-size: 5vw;
    }
}
</style>