import httpService from "./http.service";

const userEndPoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    getById: async (id) => {
        const { data } = await httpService.get(userEndPoint + id);
        return data;
    },
    update: async (id, content) => {
        const { data } = await httpService.put(userEndPoint + id, content);
        return data;
    }
};

export default userService;
