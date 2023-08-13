import * as uuid from 'uuid';
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ColorModes, Module, User} from "@/types";

export interface AppState {
    auth:{
        user_id?:string
        session_token?:string
        customerID?:string
    },
    user: User
    colorMode: ColorModes
    systemColor:boolean
    registered:boolean
    deviceId:any
    email:string
    redirectTo:string
    showBalance:boolean
    module:Module
}

const initialState:AppState = {
    auth:{},
    user: {},
    colorMode:"light",
    systemColor:false,
    registered:false,
    deviceId:uuid.v4(),
    email:"",
    redirectTo:"",
    showBalance:true,
    module:null
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setDeviceId(state, action: PayloadAction<string>) {
            state.deviceId = action.payload;
        },
        setAuth(state, action: PayloadAction<any>){
            state.auth = action.payload
        },
        setEmail(state, action: PayloadAction<string>){
            state.email = action.payload
        },
        setUser(state, action: PayloadAction<any>){
            state.user = action.payload
        },
        setColorMode(state, action: PayloadAction<any>){
            state.colorMode = action.payload
        },
        setRegistered(state, action: PayloadAction<boolean>){
            state.registered = action.payload
        },
        toggleShowBalance(state){
            state.showBalance = !state.showBalance
        },
        setSystemColor(state, action: PayloadAction<boolean>){
            state.systemColor = action.payload
        },
        setLogout(state){
            state.auth = initialState.auth
        },
        setRedirectTo(state, action: PayloadAction<string>){
            state.redirectTo = action.payload
        },
        setModule(state, action: PayloadAction<Module>){
            state.module = action.payload
        },
    },
});

export const actions = appSlice.actions;
export default appSlice.reducer;
