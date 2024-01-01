import { BackendErrorsInterface } from "../../shared/types/backendErrors.interface";
import { currentUser } from "../../shared/types/currentUser.interface";

export interface AuthStateInterface {
    isSubmitting: boolean,
    currentUser: currentUser | null | undefined,
    isLoading: boolean,
    validationErrors: BackendErrorsInterface | null,
    
}