import http from '@utils/http';
import {fetch as fetchPro} from "whatwg-fetch";

export const  booksListApi = (page,pageSize,free,group,finish,sortId)=>http.post("/api/books/booksList",{page,pageSize,free,group,finish,sortId})


export const registerUser = (userId,password)=>http.post("/api/users/register",{
    userId:userId,
    password:password
})

export const loginUser = (userId,password)=>http.post('/api/users/login',{
    userId:userId,
    password:password
})

export const userList = ()=>http.get("/api/users/list");

export const UpdatePassword =(userId,password,username)=>http.post("/api/users/updateInfo",{
    userId:userId,
    password:password,
    username:username
})
export const UpdateName =(userId,username)=>http.post("/api/users/updateInfo",{
    userId:userId,
    username:username
})

export const UpdateUserPic =(userId,userPic)=>http.post("/api/users/updateUserPic",{
    userId:userId,
    userPic:userPic
})

export const modifyUserPicApi = (formdata)=>{
    return fetchPro("/api/users/updateUserPic",{
           method:"post",
           body:formdata
         }).then(res=>res.json())
   }
export const BooksList = (params)=>http.get('http://localhost:3000/bookList',params)
export const addBook = (data)=>http.post('http://localhost:3000/bookList',data)
export const getUser = (params)=>http.get('http://localhost:3000/user',params)
export const registerHandelr = (data)=>http.post('http://localhost:3000/user',data)
export const modificationHandler = (id,data)=>http.put(`http://localhost:3000/bookList/${id}`,data)
export const deleteHandler = (id,data)=>http.Delete(`http://localhost:3000/bookList/${id}`,data)
export const getRecommendList = (params)=>http.get('http://localhost:3000/recommendList',params)
export const getCategory = (params)=>http.get('http://localhost:3000/category',params)
export const deleteCategoryHandler = (id,data)=>http.Delete(`http://localhost:3000/category/${id}`,data)
export const modificationCategoryHandler = (id,data)=>http.put(`http://localhost:3000/category/${id}`,data)
export const addCategory = (data)=>http.post('http://localhost:3000/category',data)
export const modificationUserHandler = (id,data)=>http.put(`http://localhost:3000/user/${id}`,data)
export const deleteUserHandler = (id,data)=>http.Delete(`http://localhost:3000/user/${id}`,data)
export const getCardList = (params)=>http.get('http://localhost:3000/CardList',params)
