export const serverURI = "http://localhost:3000";

export const brokerAPIRoutes = {
    prefix: '/brokers',
    getOne: (id: string) => `/brokers/${id}`,
};

export const stocksAPIRoutes = {
    prefix: '/stocks',
};