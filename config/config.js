module.exports = {
    APP: {
        PORT: process.env.PORT || 3800
    },
    DB: {
        HOST: process.env.HOST ?? "localhost",
        PORT: process.env.PORT ?? "27017",
        USER_NAME: process.env.USER_NAME ?? "",
        PASSWORD: process.env.PASSWORD ?? "",
        DATABASE: process.env.DATABASE ?? 'secureFileUploader',
        CONNECTION: process.env.CONNECTIOn ?? "mongodb"
    },
    JWT: {
        EXPIRE_IN: process.env.JWT_EXPIRES_IN
    }
}