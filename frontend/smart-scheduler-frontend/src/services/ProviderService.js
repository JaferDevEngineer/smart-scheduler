
import Api from "./api";

export async function getProviders(professionId,search,page,limit,category) {
    const res = await Api.post(`provider/get`,{professionId:professionId, search:search, page:page, category:category, limit:limit});
    return res.data;
};