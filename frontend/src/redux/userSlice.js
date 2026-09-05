// 

import { createSlice } from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        userData:null,
        suggestedUsers:null,
        profileData:null,
        following:[],
        searchData:null,
        notificationData:[]
    },
    reducers:{
       setUserData:(state,action)=>{
        state.userData=action.payload
       } ,
       setSuggestedUsers:(state,action)=>{
        state.suggestedUsers=action.payload
       } ,
       setProfileData:(state,action)=>{
        state.profileData=action.payload
       } ,
       setSearchData:(state,action)=>{
        state.searchData=action.payload
       },
        setNotificationData:(state,action)=>{
        state.notificationData=action.payload
       },
       setFollowing:(state,action)=>{
        state.following=action.payload
       },
       toggleFollow:(state,action)=>{
        const targetUserId=action.payload
if(state.following.includes(targetUserId)){
    state.following=state.following.filter(id=>id!=targetUserId)
}else{
    state.following.push(targetUserId)
}
       },
       applyFollowUpdate:(state,action)=>{
        const {followerId,followingId,isFollowing}=action.payload
        const idOf=(u)=>u?._id||u

        // keep the logged-in user's own "following" list correct (fixes count not updating)
        if(state.userData && state.userData._id===followerId){
            if(isFollowing){
                if(!state.userData.following.some(u=>idOf(u)===followingId)){
                    state.userData.following.push(followingId)
                }
            }else{
                state.userData.following=state.userData.following.filter(u=>idOf(u)!==followingId)
            }
        }

        // keep whichever profile page is currently open in sync (followers/following count)
        if(state.profileData){
            if(state.profileData._id===followingId){
                if(isFollowing){
                    if(!state.profileData.followers.some(u=>idOf(u)===followerId)){
                        state.profileData.followers.push(followerId)
                    }
                }else{
                    state.profileData.followers=state.profileData.followers.filter(u=>idOf(u)!==followerId)
                }
            }
            if(state.profileData._id===followerId){
                if(isFollowing){
                    if(!state.profileData.following.some(u=>idOf(u)===followingId)){
                        state.profileData.following.push(followingId)
                    }
                }else{
                    state.profileData.following=state.profileData.following.filter(u=>idOf(u)!==followingId)
                }
            }
        }
       }
    }

})

export const {setUserData,setSuggestedUsers,setProfileData,toggleFollow,setFollowing,setSearchData,setNotificationData,applyFollowUpdate}=userSlice.actions
export default userSlice.reducer