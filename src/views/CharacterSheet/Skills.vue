<template>
    <div class="bg">
        <h1>Skills</h1>
        <ol>        
            <li v-for="skill in skills">
                {{ skill.name }}
                <span class="ability">{{ getAbilityName(skill.name).substring(0, 3) }}.</span>
                <input class="prof-checkbox" type="checkbox" v-model="skill.prof"
                    @click="sendSkills(skill.name, skill.prof)">
                <span class="modifier">
                    {{ Math.floor((abilitySet[skillsAbility[skill.name]] - 10) / 2) + (skill.prof ? proficiency_bonus : 0)
                    }}
                </span>
            </li>
        </ol>
    </div>
</template>


<script>
export default {
    name: 'Skills',
    props: {
        skillsSet: Object,
        abilitySet: Object,
        proficiency_bonusSet: Number,
        editable: Boolean
    },
    data() {
        return {
            skills: [{ name: "Acrobatics", prof: false },
            { name: "Animal Handling", prof: false },
            { name: "Arcana", prof: false },
            { name: "Athletics", prof: false },
            { name: "Deception", prof: false },
            { name: "History", prof: false },
            { name: "Insight", prof: false },
            { name: "Intimidation", prof: false },
            { name: "Investigation", prof: false },
            { name: "Medicine", prof: false },
            { name: "Nature", prof: false },
            { name: "Perception", prof: false },
            { name: "Performance", prof: false },
            { name: "Persuasion", prof: false },
            { name: "Religion", prof: false },
            { name: "Sleight of Hand", prof: false },
            { name: "Stealth", prof: false },
            { name: "Survival", prof: false }
            ],
            ability_name: {
                "Strength": "Cила",
                "Dexterity": "Спритність",
                "Constitution": "Стійкість",
                "Intelligence": "Інтелект",
                "Wisdom": "Мудрість",
                "Charisma": "Харизма"
            },
            skill_name: {
                "Acrobatics": "Акробатика",
                "Animal Handling": "Обхід тварин",
                "Arcana": "Аркана",
                "Athletics": "Атлетика",
                "Deception": "Обман",
                "History": "Історія",
                "Insight": "Проникнення",
                "Intimidation": "Запугивание",
                "Investigation": "Розслідування",
                "Medicine": "Медицина",
                "Nature": "Природа",
                "Perception": "Спостереження",
                "Performance": "Виступ",
                "Persuasion": "Переконання",
                "Religion": "Релігія",
                "Sleight of Hand": "Ловкість рук",
                "Stealth": "Хитрість",
                "Survival": "Виживання"
            }, skillsAbility: {
                "Acrobatics": "Dexterity",
                "Animal Handling": "Wisdom",
                "Arcana": "Intelligence",
                "Athletics": "Strength",
                "Deception": "Charisma",
                "History": "Intelligence",
                "Insight": "Wisdom",
                "Intimidation": "Charisma",
                "Investigation": "Intelligence",
                "Medicine": "Wisdom",
                "Nature": "Intelligence",
                "Perception": "Wisdom",
                "Performance": "Charisma",
                "Persuasion": "Charisma",
                "Religion": "Intelligence",
                "Sleight of Hand": "Dexterity",
                "Stealth": "Dexterity",
                "Survival": "Wisdom"
            },
            ability: {
                "Strength": 10,
                "Dexterity": 10,
                "Constitution": 10,
                "Intelligence": 10,
                "Wisdom": 10,
                "Charisma": 10
            },
            proficiency_bonus: 0,
            timer: null,
            returnSkills: {},
            editableSave: true
        }
    },
    methods: {
        calculateModifier(ability) {
            score = Math.floor((ability[skill.ability] - 10) / 2) + (skill.prof ? proficiency_bonus : 0);
            return score > 0 ? "+" + score : score;
        },
        sendSkills(skillname, prof) {
            for (let i = 0; i < this.skills.length; i++) {
                if (this.skills[i].prof == undefined) {
                    this.skills[i].prof = false;
                }
                this.returnSkills[this.skills[i].name] = this.skills[i].prof;
            }
            this.returnSkills[`${skillname}`] = !prof;
            this.$emit('sendSkills', this.returnSkills);
        },
        update() {
            for (let i = 0; i < this.skills.length; i++) {
                this.skills[i].prof = this.skillsSet[this.skills[i].name]
            }
            this.ability = this.abilitySet;
            this.proficiency_bonus = this.proficiency_bonusSet;
            if (this.editableSave != this.editable) {
                this.editableSave = this.editable;
                let inputs = document.getElementsByTagName('input');

                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].disabled = !this.editable;
                }
                let selects = document.getElementsByTagName('select');
                for (let i = 0; i < selects.length; i++) {
                    selects[i].disabled = !this.editable;
                }
            }


        }, getAbilityName(skillname) {
            return this.skillsAbility[skillname];

        }, getAbylityValue(skillname) {
            return this.ability[this.skillsAbility[skillname]];
        }
    },
    mounted() {
        this.timer = setInterval(() => {
            this.update()
        }, 100)
    },
    beforeDestroy() {
        clearInterval(this.timer)
    }
}
</script>

<style scoped>
ol {
    color: white;
    width: 350px;
    margin: auto 25px;
    list-style: none;
    padding: 0;
}

li {
    color: white;
    font-size: 20px;
    text-align: left;
    margin: 10px 0;
}

input {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    outline: none;
}


.prof-checkbox {
    float: right;
    margin-right: 20px;
    width: 20px;
    height: 20px;
    border-radius: 25%;
    background-color: #555;
}

.prof-checkbox:checked {
    background-color: #4aa8e6;
    border: 1px solid white;
}

.modifier {
    float: right;
    margin-right: 20px;
}

.bg {
    width: 100%;
    height: 100%;
    margin: auto 40px auto 10px;
}


.ability {
    color: grey;
    font-size: 12px;
}

@media only screen and (max-width: 525px) {
    li {
        width: 80vw;
        flex-wrap: nowrap;
    }
}
</style>

