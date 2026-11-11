<template>
    <h1>Hello user page</h1>
    <ul>
        <li v-for="value in user" :key="value.id">
            {{ value.name }}
        </li>
    </ul>
</template>

<script setup>
import api from '@/services/api';
import { onMounted, ref } from 'vue';

const user = ref([])




const getUsers = async () => {
    const response = await api.get('/api/users')
    user.value = response.data.data
    console.log(response)
}

onMounted(() => {
    getUsers()
})
</script>