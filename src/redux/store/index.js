import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";
import { persistReducer, persistStore } from "redux-persist";
import { applyMiddleware, legacy_createStore as createStore } from "redux";

const persistConfig = {
  key: "minio-data",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = applyMiddleware(thunk);
const store = createStore(persistedReducer, middleware);

const persistor = persistStore(store);
export { store, persistor };
