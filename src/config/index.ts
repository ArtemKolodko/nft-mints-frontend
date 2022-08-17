const {
    REACT_APP_GATEWAY
} = process.env

// TODO: move all global params to config.ts
export const config = {
    api: {
        gateway: REACT_APP_GATEWAY
    }
}
