class Response {
    successResponse(data?: any, message?: string) {
        if (data && !message) {
            return {
                success: true,
                data
            }
        }
        else if (!data && message) {
            return {
                success: true,
                message
            }
        }
        else if (!data && !message) {
            return {
                success: true
            }
        }
        else {
            return {
                success: true,
                data,
                message
            }
        }
    }
    errorResponse(message: string, description: string) {
        return {
            success: false,
            error: {
                message,
                description
            }
        }
    }
}

export default new Response;