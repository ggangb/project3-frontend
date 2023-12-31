import api from './api';

class BoardService {

    getCoummunityBoard(pageable) {
        console.log(pageable)
        return api.get('/board', { params: pageable});
    }
    getchangeContent(pageable, categories) {
        console.log(pageable)
        return api.get(`/changetab/${categories}`, { params : pageable})
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
    recommend(recommend) {
        return api.post('/recommend', recommend)
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
    getTab() {
        return api.get('/gettab')
    }
    searchContent(pageable, searchData) {
        return api.get('/searchcontent', { params: searchData})
    }

    getMyPost(pageable,postData) {
        return api.get("/mypost", { params: postData})
    }
}

export default new BoardService();