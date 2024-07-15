<script setup>
  import { onMounted, ref, computed, watch } from "vue";
  import { useDate } from "vuetify";
  import { useDaysInMonth } from "../composables/useDaysInMonth.js";
  import { useMain } from "../composables/index.js";
  import TheCreateEvent from "./TheCreateEvent.vue";
  import useApi from "../api/index";

  const { types } = useMain();

  const {
    daysInMonth,
    previousHandler,
    nextHandler,
    currentDate,
    currectDays,
    firstDayOfWeek,
    updateEventsToMouth
  } = useDaysInMonth();
  const list = ref([]);
  const date = useDate();
  onMounted(async () => {
    const { data, status } = await useApi.getEvents();
    daysInMonth(data);
  });
  const dialog = ref(false);

  const type = ref(null);

  watch(
    () => currentDate.value,
    async (val) => {
      const { data, status } = await useApi.getEvents();
      daysInMonth(data);
    },
    { deep: true }
  );
  const addEvent = (event) => {
    updateEventsToMouth(event)
  }

  const filteredData = computed(() => {
    if (type.value) {
      return currectDays.value.map(week =>
        week.map(day => ({
          date: day.date,
          events: day.events.filter(event => event.categoryId === type.value)
        }))
      );
    } else {
      return currectDays.value
    }
  })

  const typesWithEmpty = computed(() => [{
    title: "Всі",
    categoryId: null,
  }
    , ...types.value])

</script>
<template>
  <TheCreateEvent v-model="dialog"
                  @addEvent="addEvent" />
  <section>
    <header>
      <v-btn @click="previousHandler"> Попередній місяць </v-btn>
      <span>{{ date.format(currentDate, "monthAndYear") }}</span>
      <v-btn @click="nextHandler"> Наступний місяць </v-btn>
      <v-select label="Тип події"
                :items="typesWithEmpty"
                item-value="categoryId"
                variant="solo"
                :rules="rules"
                required
                v-model="type"></v-select>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Пн</th>
            <th>Вт</th>
            <th>Ср</th>
            <th>Чт</th>
            <th>Пт</th>
            <th>Сб</th>
            <th>Нд</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in filteredData"
              :key="weekIndex">
            <td v-for="(day, dayIndex) in week"
                :key="day.date">
              <div v-if="day.date || (weekIndex === 0 && dayIndex >= firstDayOfWeek())">
                <template v-if="day.date">
                  {{ date.format(new Date(day.date), "dayOfMonth") }}
                  <div class=" d-flex flex-column">
                    <template v-for="(event, eventIndex) in day.events" :key="eventIndex">
                    <v-chip
                          v-if="event.name"
                          :color="event.categoryId === types[1].categoryId ? 'yellow': null">
                      <span :class="event.categoryId !== types[1].categoryId ? 'font-weight-black' : null">{{ event.name }}</span>
                      <span v-if="event.categoryId !== types[1].categoryId">*</span>
                    </v-chip>
                    </template>
                  </div>
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <footer><v-btn @click="dialog = !dialog">Створити подію</v-btn></footer>
  </section>
</template>
