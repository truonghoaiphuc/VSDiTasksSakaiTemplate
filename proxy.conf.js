const { env } = require("process");

const target = env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
    : env.ASPNETCORE_HTTPS_URLS
    ? env.ASPNETCORE_HTTPS_URLS.split(";")[0]
    : "https://127.0.0.1:44342";

console.log("target proxy:", target);

const PROXY_CONFIG = [
    {
        context: ["/api"],
        target: target,
        secure: false,
        headers: {
            Connection: "keep-alive",
        },
        pathRewrite: {
            "^/api": "https://127.0.0.1:44342/api",
        },
    },
];
console.log(PROXY_CONFIG);
module.exports = PROXY_CONFIG;
