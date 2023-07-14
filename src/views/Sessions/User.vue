<template>
    {{ this.id }}
    <ol class="characters">
        <li v-for="character in characters" v-bind:key="character.id" @click="goToCharacterPage(character.id)">
            {{ character.name }}
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



        }
    }, mounted() {
        this.getCharacterList()

    }
}
</script>
<style scoped></style>