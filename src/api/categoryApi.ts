import request from "@/utils/http"
export class CategoryService {
    static getCategoryListData(params: Record<string, any>){
        return request.get<Api.Category.CategoryListData>({
            url: "/api/category/with-site-count",
            params
        })
    }
    // 获取分类选项
    static getCategoryOptions(){
        return request.get<Api.Category.CategoryInfo[]>({
            url: "/api/category/options"
        })
    }
    static addCategory(data: Api.Category.CategoryInfo){
        return request.post({
            url: "/api/category",
            data
        })
    }
    static updateCategory(data: Api.Category.CategoryInfo){
        return request.put({
            url: "/api/category",
            data
        })
    }
    static delCategory(params: number){
        return request.del({
            url: `/api/category/${params}`
        })
    }
}