<template>
  <div>
    <div>
      <p>Thêm mới học sinh</p>
      <input v-model="newUser.student_name" placeholder="name" type="text" />
      <input v-model="newUser.email" placeholder="email" type="text" />
      <input v-model="newUser.address" placeholder="address" type="text" />
      <input v-model="newUser.phone" placeholder="phone" type="text" />
      <button @click="addStudent">Add New Student</button>
    </div>
    <div v-show="isOpen">
      <p>Sửa thông tin học sinh</p>
      <input v-model="updateUser.student_name" placeholder="name" type="text" />
      <input v-model="updateUser.email" placeholder="email" type="text" />
      <input v-model="updateUser.address" placeholder="address" type="text" />
      <input v-model="updateUser.phone" placeholder="phone" type="text" />
      <button @click="editStudentData">Edit Student</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>Address</th>
          <th>Phone Number</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="getDetailUser(user.id)"
          v-for="user in listUser"
          :key="user.id"
        >
          <td>{{ user.student_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.phone }}</td>
          <td>
            <button @click="editStudent(user.id)">Sửa</button>
            <button @click="deleteStudent(user.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Sau
      </button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";

const listUser = ref([]);
const newUser = ref({
  student_name: "",
  email: "",
  address: "",
  phone: "",
});
const updateUser = ref({
  student_name: "",
  email: "",
  address: "",
  phone: "",
});
let studentId = null;
const isOpen = ref(false);
const currentPage = ref(1);
const perPage = 5;
const totalPages = ref(0);

const getAllUser = async () => {
    const res = await axios.get(
      `http://localhost:3000/user?_page=${currentPage.value}&_limit=${perPage}`
    );
    const res2 = await axios.get(`http://localhost:3000/user`);
    const totalCount = res2.data.length;
    listUser.value = res.data;
    totalPages.value = Math.ceil(totalCount / perPage)
};

onMounted(() => {
  getAllUser();
});
const getDetailUser = async (id) => {
  const res = await axios.get(`http://localhost:3000/user/${id}`);
};

const deleteStudent = async (id) => {
  await axios.delete(`http://localhost:3000/user/${id}`);
  getAllUser();
};

const addStudent = async () => {
  const newStudent = {
    student_name: newUser.value.student_name,
    email: newUser.value.email,
    address: newUser.value.address,
    phone: newUser.value.phone,
    create_at: dayjs().toISOString(),
  };
  await axios.post(`http://localhost:3000/user`, newStudent);
  getAllUser();
  newUser.value = { student_name: "", email: "", address: "", phone: "" };
};

const editStudent = async (id) => {
  isOpen.value = true;
  const res = await axios.get(`http://localhost:3000/user/${id}`);
  if (res.data) {
    const user = res.data;
    updateUser.value = { ...user };
    studentId = id;
  }
};
const editStudentData = async () => {
  const updatedStudent = {
    student_name: updateUser.value.student_name,
    email: updateUser.value.email,
    address: updateUser.value.address,
    phone: updateUser.value.phone,
  };
  await axios.put(`http://localhost:3000/user/${studentId}`, updatedStudent);
  getAllUser();
  updateUser.value = { student_name: "", email: "", address: "", phone: "" };
  studentId = null;
  isOpen.value = false;
};
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getAllUser();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    getAllUser();
  }
};

</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
}

thead {
  background-color: #475569;
  color: white;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

th {
  font-weight: bold;
}

tbody tr:hover {
  background-color: #f1f5f9;
}

button {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-child {
  background-color: #fbbf24;
  color: white;
}

button:last-child {
  background-color: #ef4444;
  color: white;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.pagination button {
  background-color: #e2e8f0;
  color: #475569;
  margin: 0 5px;
}

.pagination button.active {
  background-color: #3b82f6;
  color: white;
}
</style>
