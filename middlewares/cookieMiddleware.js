// middlewares/cookieMiddleware.js
import { parse } from 'cookie';

export const parseCookies = (req) => {
    return parse(req.headers.cookie || '');
};