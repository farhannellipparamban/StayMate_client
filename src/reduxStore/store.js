import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import ownerReducer from "./slices/ownerSlice";
import adminReducer from './slices/adminSlice'

const persistConfig = { key: "root", storage, version: 1 };
const reducer = combineReducers({
  userReducer,
  ownerReducer,
  adminReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
