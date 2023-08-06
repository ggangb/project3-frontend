import api from './api';

class BoardService {

    getCoummunityBoard(pageable) {
        console.log(pageable)
        return api.get('/board', { params: pageable});
    }

    writeSubmit(writeData) {
        return api.post('/board', writeData)
        
    }
    getContent(idx) {
        return api.get(`/getcontent/${idx}`)
    }
    getRank() {
        return api.get('/getrank')
    }
    recommend(idx) {
        return api.get(`/recommend/${idx}`)
    }
    upmentSubmit(upmentData) {
        return api.post('/comment', upmentData)
    }
    getComment() {
        return api.get('/comment')
    }
    reCommendSubmit(reCommentData) {
        return api.post('/recomment', reCommentData)
    }
   
}

export default new BoardService();