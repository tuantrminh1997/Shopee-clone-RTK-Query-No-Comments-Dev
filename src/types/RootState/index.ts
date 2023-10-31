import store from "src/store";

// Lấy RootState và AppDispatch từ store của chúng ta
type RootState = ReturnType<typeof store.getState>;
export default RootState;
