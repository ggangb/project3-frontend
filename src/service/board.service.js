import api from './api';

class BoardService {

    getCoummunityBoard(pageable) {
        console.log(pageable)
        return api.get('/board', { params: pageable});
    }

    writeSubmit(writeData) {
        return api.post('/board', writeData)
        
    }
    getContent(contentId) {
        return api.get(`/getcontent/${contentId}`)
    }
}

export default new BoardService();