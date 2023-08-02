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
        return api.post('/upmment', upmentData)
    }
    downmentSubmit(downmentData) {
        return api.post('/downment', downmentData)
    }
    downmentReSubmit(downmentData) {
        return api.post('/redownment', downmentData)
    }
    getUpment(pageable,postId) {
        return api.get(`/upment/${postId}`,{ params: pageable});
    }
    getDownment(postId) {
        return api.get(`/downment/${postId}`)
    }
}

export default new BoardService();