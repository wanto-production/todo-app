
export const load = async ({ url }) => {
    const message = url.searchParams.get("message")
    return{ message }
}