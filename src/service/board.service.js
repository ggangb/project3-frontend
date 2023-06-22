import api from './api';

class BoardService {
    getCoummunityBoard() {
        return api.get('/board');
    }
}

export default new BoardService();