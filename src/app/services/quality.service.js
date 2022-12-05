import httpService from "./http.service";

const qualitiesEndPoint = "quality/";

const qualitiesService = {
    fetchAll: async () => {
        const { data } = await httpService.get(qualitiesEndPoint);
        return data;
    }
};

export default qualitiesService;
