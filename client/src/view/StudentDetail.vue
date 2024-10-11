<template>
    <div v-if="user.value">
      {{ user.value.student_name }}
    </div>
  </template>
  
  <script setup>
  import axios from "axios";
  import { ref, onMounted } from "vue"; 
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  const { id } = route.params;
  const user = ref({}); 
  const getAllUser = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/user/${id}`);
      user.value = res.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  onMounted(() => {
    getAllUser();
  });
  </script>
  
  <style></style>
  