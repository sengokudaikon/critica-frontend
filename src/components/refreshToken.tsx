import api from "@/components/api";

async function refreshToken(userId: string, refreshToken: string) {
    try {
        const response = await api.post('/api/auth/refresh', {
            userId,
            refreshToken,
        });

        // Update tokens in local storage
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export default refreshToken;
