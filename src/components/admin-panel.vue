<script>
import CreateNewClassForm from "./create-new-class-form.vue"

export default {
  name: 'AdminPanel',

  components: { CreateNewClassForm },
}
</script>

<template>
  <div>
    <div class="rtu-text-2xl rtu-mb-6">Панель администратора</div>
    <div>
      <ul class="rtu-space-y-6">
        <li>
          <CreateNewClassForm />
        </li>
      </ul>
    </div>
  </div>
</template>
