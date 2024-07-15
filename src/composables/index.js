import { ref } from "vue";
export function useMain() {
  const types = ref([
    {
      title: "Конференція",
      categoryId: "4d115ae7-ef38-45b7-baf3-8fd9e080a596",
    },
    {
      title: "Свято",
      categoryId: "d6ef1e8d-c49f-4231-91cb-c3363a943fd8",
    },
    {
      title: "Навчання",
      categoryId: "23585758-9bdc-4d54-8b98-670c6f1dda5f",
    },
  ]);

  const events = ref([]);

  return {
    types,
    events,
  };
}
