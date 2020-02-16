const ignoreRoutes = [
    'login',
];

export const authGuard = (to, from, next) => {
    const guest = !window.localStorage.access_token;

    const requiresAuth = to.matched.some(r => (r.meta.requiresAuth));

    return guest && requiresAuth ? next({name: 'login_page'}) : next();
};