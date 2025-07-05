import http from '@/http';

const getUser = () => {
    return http.get('/posts');
};

export default {
    getUser,
};
