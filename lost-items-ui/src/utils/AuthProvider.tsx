import React, { createContext, useContext, ReactNode, useState } from "react";
import RefreshAccessTokenApiCall from "../api/auth/RefreshAccessTokenApiCall";

type AuthContextType = {
  accessToken: string | any;
  refreshToken: string | any;
  setTheAccessToken: (accessToken: string) => void;
  setTheRefreshToken: (refreshToken: string) => void;
  clearTokens: () => void;
  autoRefreshAccessToken: (refreshToken: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const setTheAccessToken = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
    console.log("--Access Token Setted");
  };
  const setTheRefreshToken = (newRefreshToken: string) => {
    setRefreshToken(newRefreshToken);
    console.log("--Refresh Token Setted");
  };

  const clearTokens = () => {
    setAccessToken(null);
    setRefreshToken(null);
  };
  const autoRefreshAccessToken = async (
    refreshToken: string
  ): Promise<boolean> => {
    try {
      const response = await RefreshAccessTokenApiCall(refreshToken);
      if (response) {
        if (response.status === 200) {
          // Access token was successfully refreshed
          const newAccessToken = response.data.accessToken;
          setTheAccessToken(newAccessToken);
          return true;
        } else if (response.status === 401) {
          // Invalid refresh token
          console.log("Invalid refresh token");
          return false;
        } else if (response.status === 400) {
          response.data.errors.forEach((err: string) => {
            console.log(err);
          });
        } else {
          console.log("Unknown Error :" + response.status);
        }
      }
      return false; // Handle other response statuses here
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        refreshToken,
        setTheAccessToken,
        setTheRefreshToken,
        clearTokens,
        autoRefreshAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
