import { PRODUCT_LIST_FAILED, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "./types";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
   try {
      dispatch({
         type: PRODUCT_LIST_REQUEST,
      });

      const {
         data: { data },
      } = await axios.get("/api/products");
      dispatch({
         type: PRODUCT_LIST_SUCCESS,
         payload: data,
      });
   } catch (e) {
      console.log(e);
      dispatch({
         type: PRODUCT_LIST_FAILED,
         payload:
            e.message && e.response.data.message
               ? e.response.data.message
               : "Server didnt response",
      });
   }
};
