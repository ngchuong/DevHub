import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import projectsReducer from "./slices/projectsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      projects: projectsReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

