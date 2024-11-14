import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from ".";

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
