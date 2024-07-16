import { ref } from "vue";
import { useDate } from "vuetify";
import { useMain } from "../composables/index.js";
const { events } = useMain();
export function useDaysInMonth() {
  const date = useDate();

  const currentDate = ref(new Date());
  const currectDays = ref([]);
  const previousHandler = () => {
    currentDate.value = date.getPreviousMonth(currentDate.value);
  };

  const nextHandler = () => {
    currentDate.value = date.getNextMonth(currentDate.value);
  };

  const isWithinRange = (date, range) => {
    if (!range) return true;

    const [start, end] = range;

    if (!start && !end) return true;

    if (start && !end) return date >= start;

    if (!start && end) return date <= end;

    if (start && end) return date >= start && date <= end;
  };

  const firstDayOfWeek = () => {
    const lastDayOfMonth = new Date(
      currentYear.value,
      currentMonth.value + 1,
      0
    );
    return lastDayOfMonth.getDay();
  };



  
  const daysInMonth = (events = []) => {
    const currentMonth = ref(currentDate.value.getMonth());
    const currentYear = ref(currentDate.value.getFullYear());
    const days = [];
    const firstDayOfMonth = new Date(currentYear.value, currentMonth.value, 1);
    const lastDayOfMonth = new Date(
      currentYear.value,
      currentMonth.value + 1,
      0
    );

    let currentDateNew = firstDayOfMonth;
    let week = [];

    while (currentDateNew <= lastDayOfMonth) {
      const day = {
        date: new Date(currentDateNew),
        events: [],
      };

      if (events.length) {
        // Додаємо події до дня
        events.forEach((event) => {
          const startDate = new Date(event.startDate);
          const endDate = new Date(event.endDate);
          if (date.isWithinRange(currentDateNew, [startDate, endDate])) {
            day.events.push({
              id: event.id,
              ...event,
              startDate,
              endDate,
            });
          }
        });
      }

      week.push(day);
      if (week.length === 7 || currentDateNew.getDay() === 0) {
        days.push(week);
        week = [];
      }
      currentDateNew.setDate(currentDateNew.getDate() + 1);
    }

    if (week.length > 0) {
      days.push(week);
    }

    currectDays.value = days;
  };

  const updateEventsToMouth = (event) => {
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    currectDays.value.forEach((week) => {
      week.forEach((item) => {
        if (isWithinRange(item.date, [startDate, endDate])) {
          item.events.push(event);
        }
      });
    });
  };

  return {
    daysInMonth,
    previousHandler,
    nextHandler,
    currentDate,
    firstDayOfWeek,
    updateEventsToMouth,
    currectDays,
  };
}
