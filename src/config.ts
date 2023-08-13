const env = {
    dev : {
        // baseUrl:"http://172.20.10.2:6545",
        // baseUrl:"http://192.168.43.145:6545",
        baseUrl:"http://localhost:6545",
    },
    live : {
        baseUrl:"https://api.alphacipher.net",
    }
};

const config = env.live;
// const config = env.dev;
export const KEY=Math.random().toString(36).substring(2,20)
export const FONT_NAME = "Kodchasan"
export const DOMAIN = "https://alphacipher.net"
export default config;
