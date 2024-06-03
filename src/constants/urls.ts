const baseURL = "http://owu.linkpc.net/carsAPI/v2";

const auth = "/auth";
const users = "/users";
const cars = "/cars";

const urls = {
    auth: {
        login: auth,
        refresh: `${auth}/refresh`,
        register: users,
        me: `${auth}/me`
    },
    cars: {
        base: cars,
        getById: (id: number) => `${cars}/${id}`
    }
}

export {
    baseURL,
    urls
}