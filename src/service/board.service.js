import api from './api';

class BoardService {
    //커뮤니티 페이지의 첫화면에 글들을 가져오는 메소드
    getCoummunityBoard(pageable) {
        console.log(pageable)
        return api.get('/board', { params: pageable});
    }
    //탭을 변경했을때 바뀐 글들을 가져오는 메소드
    getchangeContent(pageable, categories) {
        console.log(pageable)
        return api.get(`/changetab/${categories}`, { params : pageable})
    }
    //글작석 메소드
    writeSubmit(writeData) {
        return api.post('/board', writeData)
    //글의 번호로 그 번호에 해당하는 글의 데이터를 가져오는 메소드 
    }
    getContent(idx) {
        return api.get(`/getcontent/${idx}`)
    }
    //커뮤니티페이지 첫화면에 나올 인기글 가져오는 메소드
    getRank() {
        return api.get('/getrank')
    }
    //글 추천 메소드
    recommend(recommend) {
        return api.post('/recommend', recommend)
    }
    //댓글등록 메소드
    upmentSubmit(upmentData) {
        return api.post('/comment', upmentData)
    }
    //글의 번호에 대한 댓글들을 가져오는 메소드
    getComment(pageable,postId) {
        return api.get(`/comment/${postId}`,{ params: pageable})
    }
    //대댓글 등록 메소드
    reCommendSubmit(reCommentData) {
        return api.post('/recomment', reCommentData)
    }
    //글 삭제 메소드
    deleteBoard(postId) {
        return api.delete(`/deleteboard/${postId}`)
    }
    //글 수정 메소드
    updateBoard(updateData) {
        return api.put('/updateboard', updateData)
    }
    //대댓글 수정 메소드
    reCommendUpdate(reCommentData) {
        return api.put('/updaterecomment', reCommentData)
    }
    //댓글 삭제 메소드
    deleteComment(postId) {
        return api.put(`/deletecomment/${postId}`)
    }
    //글의 탭들을 가져오는 메소드
    getTab() {
        return api.get('/gettab')
    }
    //글 검색 메소드
    searchContent(pageable, searchData) {
        return api.get('/searchcontent', { params: searchData})
    }
    //내가 작성한 글을 가져오는 메소드
    getMyPost(pageable,postData) {
        return api.get("/mypost", { params: postData})
    }
}

export default new BoardService();