
import Api from "./api";

export async function getProviders(professionId,search,page,limit) {
    const res = await Api.post(`provider/get`,{professionId:professionId, search:search,page:page,limit:limit});
    return res.data;
};