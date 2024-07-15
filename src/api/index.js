import axios from "../plugins/axios";
export default {
  async getEvents() {
    return await axios("/api/Event/All");
  },
  async createEvent(data) {
    return await axios.post("/api/Event/Create", {
      ...data,
    });
  },
};
