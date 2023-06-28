import api from './api';

class BoardService {

    getCoummunityBoard() {
        return api.get('/board');
    }

    writeSubmit(writeData) {
        return api.post('/board', writeData)
        
    }
}

export default new BoardService();