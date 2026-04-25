import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

import layout from "./layoutSlice";
import translation from "./translationSlice";
import userReducer from './userSlice';
import cartReducer from './myCartSlice';
import { fadReducer, Diseases, Specialities, hospitals } from './citySpecialityDiseaseDoctorLayout';

const combinedReducer = combineReducers({
  layout,
  translation,
  user: userReducer,
  cart: cartReducer,
  cities: fadReducer,
  specialityDiseaseDoctor: fadReducer,
  diseaseNames: Diseases,
  specialityName: Specialities,
  hospitalsList: hospitals
})


const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      layout: {
        header: state.layout.header + action.payload.layout.header
      },
      translation: {
        i18n: state.translation.i18n
      },
      userData: {
        user: state.userData ? state.userData?.user : null
      },
      cartData: {
        cart: state.cartData ? state.cartData?.cart : null
      },
      citiesData: {
        cities: state.citiesData ? state.citiesData?.cities : null
      },
      specialityDiseaseDoctorData: {
        specialityDiseaseDoctor: state.specialityDiseaseDoctorData ? state.specialityDiseaseDoctorData?.specialityDiseaseDoctor : null
      }
    }

    return nextState;

  }

  else {
    return combinedReducer(state, action);
  }
}

export const makeStore = () =>
  configureStore({
    reducer: masterReducer
  })


export const wrapper = createWrapper(makeStore, { debug: true })