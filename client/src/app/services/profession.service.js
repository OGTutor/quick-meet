import httpService from "./http.service";

const professionEndPoint = "profession/";

const professionsService = {
    fetchAll: async () => {
        const { data } = await httpService.get(professionEndPoint);
        return data;
    }
};

export default professionsService;
