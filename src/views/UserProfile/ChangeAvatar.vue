<template>
    <div class="block">
        <Portrait class="current-portrait" :id="portraitId"></Portrait>
        <label for="file" class="new-portrait">Upload new portrait</label>
        <input id="file" type="file" @change="uploadImage">
    </div>
</template>
<script>
import Portrait from '../Portrait.vue';

export default {
    name: 'ChangeAvatar',
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
            fetch(this.url + ":1290/users/me", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.token
                },
                body: JSON.stringify({
                    portraitId: id
                })
            }).then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        },
        getPortraitID() {
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
    },
    mounted() {
        this.token = localStorage.getItem('token')
        if (this.token) {
            this.getPortraitID()
        }
    }
}
</script>
<style scoped>
.block {
    margin-top: 25px;
    width: 500px;
    height: 250px;
    background-color: #333;
    margin: 0 auto;
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
    border-radius: 50%;
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

@media only screen and (max-width: 525px) {
    .block {
        width: 80vw;
        height: 40vw;
    }

    .current-portrait {
        width: 50vw;
        height: 50vw;
    }

    .new-portrait {
        width: 50vw;
        height: 10vw;
    }
}
</style>