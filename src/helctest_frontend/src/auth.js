import { AuthClient } from "@dfinity/auth-client";

export const initAuthClient = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        return authClient;
    } else {
        await authClient.login({
            onSuccess: () => {
                window.location.reload();
            },
        });
    }
    return authClient;
};
