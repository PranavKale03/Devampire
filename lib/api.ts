import axios from 'axios';

const API = axios.create({ baseURL: 'https://devampire-server.onrender.com' });

API.interceptors.request.use((req) => {
    if (typeof window !== 'undefined' && localStorage.getItem('Profile')) {
        const profile = JSON.parse(localStorage.getItem('Profile') || '{}');
        if (profile.token) {
            req.headers.authorization = `Bearer ${profile.token}`;
        }
    }
    return req;
});

export const logIn = (authData: any) => API.post('/user/login', authData);
export const signUp = (authData: any) => API.post('/user/signup', authData);

export const postQuestion = (questionData: any) => API.post('/questions/Ask', questionData);
export const getAllQuestions = () => API.get('/questions/get');
export const deleteQuestion = (id: string) => API.delete(`/questions/delete/${id}`);
export const voteQuestion = (id: string, value: string, userId: string) => API.patch(`/questions/vote/${id}`, { value, userId });

export const postAnswer = (id: string, noOfAnswers: number, answerBody: string, userAnswered: string, userId: string) => API.patch(`/answer/post/${id}`, { noOfAnswers, answerBody, userAnswered, userId });
export const deleteAnswer = (id: string, answerId: string, noOfAnswers: number) => API.patch(`/answer/delete/${id}`, { answerId, noOfAnswers });

export const fetchAllUsers = () => API.get('/user/getAllUsers');
export const updateProfile = (id: string, updateData: any) => API.patch(`/user/update/${id}`, updateData);

export default API;
