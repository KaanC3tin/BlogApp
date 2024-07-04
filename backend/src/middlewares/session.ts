import session from "express-session";
import { redisStore } from "../config/redis"


export default session({ // bu middlware cookie içerisinde sessId isimli cookiye arayıp req.session objesine atayacak
    name: 'sessId', // Çerez adını özelleştir
    store: redisStore,
    secret: process.env.SESSION_SECRET as string, // Güvenli bir secret key kullanın
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true olursa, HTTPS üzerinden çalıştırmanız gerekir
})