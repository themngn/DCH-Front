<template>
    <div @click.self="close" class="backdrop">
        <div class="block">
            <Portrait class="current-portrait" :id="characterPictureId"></Portrait>
            <label for="file" class="new-portrait">Upload new portrait</label>
            <input id="file" type="file" @change="uploadImage">
        </div>
    </div>
</template>

<script>
import Portrait from './Portrait.vue';

export default {
    name: 'PictureChange',
    props: {
        username: String,
        characterId: Number,
        characterPictureId: Number
    },
    components: {
        Portrait
    },
    data() {
        return {
            username: '',
            id: -1,
            characters: [],
            token: '',
            url: '',
            picture: '',
            image: '',
            portraitId: 1
        }
    },
    methods: {
        uploadImage() {
            console.log('uploading')
            const file = document.getElementById('file').files[0]
            const reader = new FileReader()
            this.token = localStorage.getItem('token')

            reader.onloadend = () => {
                this.picture = reader.result
                console.log(this.picture)
                this.url = window.location.href.split(':8080')[0]
                this.token = localStorage.getItem('token')
                fetch(this.url + ":1290/portraits", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                    body: JSON.stringify({
                        data: this.picture
                    })
                }).then(res => res.json())
                    .then(data => {
                        console.log(data)
                        this.setId(data.id)
                        this.portraitId = data.id

                    })
            }
            reader.readAsDataURL(file);
        },
        setId(id) {
            this.url = window.location.href.split(':8080')[0]
            this.token = localStorage.getItem('token')
            fetch(`${this.url}:1290/characters/${this.characterId}/portrait`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token,
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    portraitId: id,
                    name: 'null'
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.$emit('close')
                })
        }, close() {
            console.log('close')
            this.$emit('close')
        }


    },
    mounted() {
        this.token = localStorage.getItem('token')
        this.portraitId = this.characterPictureId
    }
}
</script>
<style scoped>
.backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
}

.block {
    width: 500px;
    height: 250px;
    background-color: #333;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
}

.current-portrait {
    width: 200px;
    height: 200px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 0;
    border-radius: 5%;
}

.new-portrait {
    width: 200px;
    height: 50px;
    background-color: rgba(0, 195, 94, 1);
    margin: auto;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #2c3e50;

}

input[type="file"] {
    display: none;
}
</style>