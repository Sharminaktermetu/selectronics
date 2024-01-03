const bkashConfig = {
//     base_url : 'https://tokenized.pay.bka.sh/v1.2.0-beta',
//     username: '01886400041',
//     password: '{9;ri5-E07|',
//     app_key: 'sAZWhwhjxvVTn0blJ5fdILYVtc',
//     app_secret: 'SwW6WTU9e01or5cwNmzFqvrNZ2TuWrWQuc3Mb9PKtc85QBLao3o1'

    base_url : 'https://tokenized.pay.bka.sh/v1.2.0-beta',
    username: process.env.B_USER_NAME,
    password: process.env.B_PASS,
    app_key:process.env.B_KEY,
    app_secret:process.env.B_SECRET
   }

module.exports = {
    bkashConfig,
};