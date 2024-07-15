<script setup>
  import { ref, watch } from "vue";
  import useApi from '../api/index'
  import { useMain } from '../composables/index.js'
  const emit = defineEmits(["update:modelValue", 'addEvent']);
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
  const formRef = ref(null)
  const { types } = useMain()

  const rules = [
    (value) => {
      if (value) return true;
      return "Поле є обов'язковим";
    },
  ];


  function dateRangeValidation(startDate, endDate) {
    return (value) => {
      if (!value) {
        return true;
      }

      const selectedDate = new Date(value);

      if (startDate && selectedDate < new Date(startDate)) {
        return 'Дата не може бути раніше початкової дати';
      }

      if (endDate && selectedDate > new Date(endDate)) {
        return 'Дата не може бути пізніше кінцевої дати';
      }

      return true;
    };
  }

  const form = ref({
    name: "",
    categoryId: "",
    startDate: "",
    endDate: "",
  });


  // watch(() => props.modelValue)
  const createEvent = async () => {
    const { valid } = await formRef.value.validate()
    if (!valid) return
    try {
      const { data, status } = await useApi.createEvent(form.value)
      console.log(status)
      if (status === 200) {
        emit('addEvent', data)
        emit('update:modelValue', false)
      }
    } catch (e) {
      console.error(e)
    }
  };
</script>
<template>
  <v-dialog v-model="props.modelValue"
            max-width="480"
            @click:outside="emit('update:modelValue', false)">
    <v-card title="Створити подію">
      <v-form ref="formRef"
              @submit.prevent="createEvent">
        <v-text-field label="Назва"
                      v-model="form.name"
                      :rules="rules"
                      required></v-text-field>
        <v-select label="Тип події"
                  :items="types"
                  item-value="categoryId"
                  variant="solo"
                  :rules="rules"
                  required
                  v-model="form.categoryId"></v-select>
        <v-text-field label="Дата початку"
                      v-model="form.startDate"
                      :rules="[...rules, dateRangeValidation(null, form.endDate)]"
                      type="date"
                      required></v-text-field>
        <v-text-field label="Дата завершення"
                      v-model="form.endDate"
                      :rules="[...rules, dateRangeValidation(form.startDate, null)]"
                      type="date"
                      required></v-text-field>
        <v-btn class="mt-2"
               type="submit"
               block>Створити</v-btn>
      </v-form>
      <v-card-actions>
        <v-btn text="Закрити"
               variant="text"
               @click="emit('update:modelValue', false)"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
