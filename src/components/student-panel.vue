<script>
import axios from 'axios'
import { mapState } from 'pinia'
import { authStore } from '../stores/auth-store.js'

export default {
  name: 'StudentPanel',

  data() {
    return {
      loadingSetGroup: false,
      loadingGroups: false,
      loadingGroup: false,
      loadingLeaveGroup: false,
      setGroupErrorMessage: null,
      groupErrorMessage: null,
      groupsErrorMessage: null,
      leaveErrorMessage: null,
      group: null,
      groups: [],
      showGroups: false,
    }
  },

  computed: {
    ...mapState(authStore, ['currentUser']),
  },

  methods: {
    async getStudentGroup() {
      this.groupErrorMessage = null
      this.loadingGroup = true

      try {
        const response = await axios.get('http://localhost:4000/api/v1/group/student-group/' + this.currentUser._id)

        if (response.data.success) {
          this.group = response.data.data.group
        } else {
          this.groupErrorMessage = response.data.data.message
        }
      } catch (error) {
        this.group = null
        this.groupErrorMessage = 'Класс не найден! Выберите свой класс!'
      } finally {
        this.loading = false
      }
    },

    async loadGroups() {
      this.groupsErrorMessage = null
      this.loadingGroups = true

      try {
        const response = await axios.get('http://localhost:4000/api/v1/group')

        if (!response.data.success) {
          this.groupsErrorMessage = 'Не удалось загрузить классы'
        } else {
          this.groups = response.data.data.groups
        }
      } catch (error) {
        this.groupsErrorMessage = 'Не удалось загрузить классы'
      } finally {
        this.loadingGroups = false
      }
    },

    enableGroups() {
      this.showGroups = true
      this.loadGroups()
    },

    async setGroup(groupId) {
      this.loadingSetGroup = true
      this.setGroupErrorMessage = null
      this.groupErrorMessage = null
      this.groupsErrorMessage = null
      this.showGroups = false

      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/group/add-student',
          {
            studentId: this.currentUser._id,
            groupId
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )

        if (!response.data.success) {
          this.setGroupErrorMessage = 'Не удалось привязать группу'
        } else {
          this.group = response.data.data.group
        }
      } catch (error) {
        this.groupsErrorMessage = 'Не удалось загрузить классы'
      } finally {
        this.loadingGroups = false
      }
    },

    async leaveGroup() {
      this.setGroupErrorMessage = null
      this.groupErrorMessage = null
      this.groupsErrorMessage = null
      this.loadingLeaveGroup = true

      try {
        const response = await axios.post(
          'http://localhost:4000/api/v1/group/remove-student',
          {
            studentId: this.currentUser._id,
            groupId: this.group._id,
          },
          {
            headers: {
              'Content-Type': 'application/json'
            },
          },
        )

        if (response.data.success) {
          this.group = null
        }
      } catch (error) {
        this.leaveErrorMessage = 'Не удалось покинуть класс'
      } finally {
        this.loadingLeaveGroup = false
      }
    },
  },

  mounted() {
    this.getStudentGroup()
  },
}
</script>

<template>
  <div>
    <div class="rtu-text-2xl rtu-mb-6">Панель ученика</div>
    <div>
      <ul class="rtu-space-y-6">
        <li>
          <div class="rtu-flex rtu-items-center rtu-space-x-3">
            <div class="rtu-text-green-800">Ваш класс:</div>
            <div v-if="group">{{ group.title }}</div>
            <div v-else>Без класса</div>
          </div>
          <div v-if="groupErrorMessage" class="rtu-text-red-700">{{ groupErrorMessage }}</div>
          <div v-if="groupsErrorMessage" class="rtu-text-red-700">{{ groupsErrorMessage }}</div>
          <div v-if="setGroupErrorMessage" class="rtu-text-red-700">{{ setGroupErrorMessage }}</div>
          <div v-if="leaveErrorMessage" class="rtu-text-red-700">{{ leaveErrorMessage }}</div>
          <div v-if="!group">
            <button
              v-if="!showGroups"
              class="rtu-bg-green-600 rtu-text-white rtu-rounded-md rtu-p-3 hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-500 disabled:rtu-bg-green-900"
              @click="enableGroups"
            >Показать классы</button>
            <div v-else>
              <div v-if="loadingGroups">Загружаю классы</div>
              <div v-else-if="groupsErrorMessage">Ошибка во время загрузки классов</div>
              <div v-else-if="groups.length === 0">Нету классов</div>
              <ul v-else class="rtu-space-y-4">
                <li
                  class="rtu-flex rtu-items-center rtu-space-x-4"
                  v-for="group in groups"
                  :key="group._id"
                >
                  <div>Класс {{ group.title }}</div>
                  <button
                    class="rtu-bg-green-600 rtu-text-white rtu-rounded-md rtu-p-2 hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-500 disabled:rtu-bg-green-900"
                    @click="setGroup(group._id)"
                  >Выбрать этот класс</button>
                </li>
              </ul>
            </div>
          </div>
          <div v-else>
            <button
              @click="leaveGroup"
              :disabled="loadingLeaveGroup"
              class="rtu-bg-green-600 rtu-text-white rtu-rounded-md rtu-p-3 hover:rtu-bg-green-500 rtu-transition-colors rtu-duration-500 disabled:rtu-bg-green-900"
            >Покинуть класс</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
