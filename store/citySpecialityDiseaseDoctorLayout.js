import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API, { APIV3 } from '@/utils/httpService';
import { allCities, searchByAnything, diseaseAll, specialityAll, hospitalAll } from '@/utils/endpoints';

// Async thunk for fetching user data from the API
export const fetchCities = createAsyncThunk('city/fetchCities', async () => {
  const response = await APIV3.get(`${allCities}`);
  return response?.data?.data;
});

export const fetchSpecialitiesDiseaseDoctor = createAsyncThunk('speciatlityDiseaseDoctor/fetchSpeciatlityDiseaseDoctor', async () => {
  const response = await APIV3.get(`${searchByAnything}`);
  return response?.data?.data;
});

export const fetchDiseaseNames = createAsyncThunk('overallDiseases/overallDiseases', async () => {
  const response = await APIV3.get(`${diseaseAll}`)
  return response?.data?.data;
})

export const fetchSpecialityNames = createAsyncThunk('overallSpecialities/overallSpecialities', async () => {
  const response = await APIV3.get(`${specialityAll}`)
  return response?.data?.data;
})


export const hospitalNames = createAsyncThunk('hospitalNames/hospitalNames', async (id) => {
  const response = await APIV3.get(`${hospitalAll}=${id}`)
  return response?.data?.data;
})

const myCitiesSpecialitiesDiseaseSlice = createSlice({
  name: 'city-specialities-disease',
  initialState: {
    cities: null,
    specialityDiseaseDoctor: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.loading = false;
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })


      .addCase(fetchSpecialitiesDiseaseDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialitiesDiseaseDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.specialityDiseaseDoctor = action.payload;
      })
      .addCase(fetchSpecialitiesDiseaseDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  },
});

const DiseaseNames = createSlice({
  name: 'disease-names',
  initialState: {
    diseaseNames: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiseaseNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiseaseNames.fulfilled, (state, action) => {
        state.loading = false;
        state.diseaseNames = action.payload;
      })
      .addCase(fetchDiseaseNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

const SpecialityNames = createSlice({
  name: 'disease-names',
  initialState: {
    SpecialityNames: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecialityNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecialityNames.fulfilled, (state, action) => {
        state.loading = false;
        state.SpecialityNames = action.payload;
      })
      .addCase(fetchSpecialityNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

const hospitalListing = createSlice({
  name: 'hospital-names',
  initialState: {
    hospitalList: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hospitalNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(hospitalNames.fulfilled, (state, action) => {
        state.loading = false;
        state.hospitalList = action.payload;
      })
      .addCase(hospitalNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export const fadReducer = myCitiesSpecialitiesDiseaseSlice.reducer;
export const Diseases = DiseaseNames.reducer;
export const hospitals = hospitalListing.reducer;
export const Specialities = SpecialityNames.reducer;
