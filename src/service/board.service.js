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
    getComment(pageable,postId) {
        return api.get(`/comment/${postId}`,{ params: pageable})
    }
    reCommendSubmit(reCommentData) {
        return api.post('/recomment', reCommentData)
    }
    deleteBoard(postId) {
        return api.delete(`/deleteboard/${postId}`)
    }
    updateBoard(updateData) {
        return api.put('/updateboard', updateData)
    }
    reCommendUpdate(reCommentData) {
        return api.put('/updaterecomment', reCommentData)
    }
    deleteComment(postId) {
        return api.put(`/deletecomment/${postId}`)
    }
   
}

export default new BoardService();