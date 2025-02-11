import {create} from "zustand"
type AuthStoreType = {
    isAuthenticated: boolean;
    setIsAuthenticated: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    isAuthenticated: false,
    setIsAuthenticated: (status) => set({isAuthenticated: status})
}))