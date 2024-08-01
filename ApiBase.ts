import { useTokenStore } from "@/stores";

export class ApiBase {
    private authToken: string = '';
    private setAuthTokenCall: boolean = false;

    public setAuthToken(token: string) {
        this.setAuthTokenCall = true;
        this.authToken = token;
    }

    protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
        if (!this.setAuthTokenCall) {
            this.authToken = useTokenStore().getToken();
        }

        if (this.authToken != '') {
            options.headers = {
                ...options.headers,
                Authorization: this.authToken,
            };
        }
        return Promise.resolve(options);
    };

    protected transformResult(url: string, response: Response, processor: (response: Response) => any) {
        // TODO: Return own result or throw exception to change default processing behavior, 
        // or call processor function to run the default processing logic

        // console.log("Service call: " + url);
        return processor(response); 
    }
}