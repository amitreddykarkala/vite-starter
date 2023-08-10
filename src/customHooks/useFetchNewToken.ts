import axios from "axios";
import { useState } from "react";
import { FetchState } from "../interfaces/Interfaces";
import { CONSOLE_BASE_URL } from "../utils/Constants";

interface NewTokenResponse {
    AccessToken : string;
    RefreshToken : string;
}

export function useFetchNewToken() {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const getNewTokenRequest = async (selectedOrganzationId: string) => {
    try {
      setFetchState(FetchState.LOADING);
      const res = await axios.get(`${CONSOLE_BASE_URL}/api/tokens/new`, {timeout: 15000,
        headers: {
            "x-sens-organization-id": selectedOrganzationId 
        }, })

      const resData = res.data as NewTokenResponse;

      if (resData ) {
        localStorage.setItem("AccessToken", resData.AccessToken);
        localStorage.setItem("RefreshToken", resData.RefreshToken);
      }
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [fetchState, getNewTokenRequest] as const;
}
