import http from '../http-common'

class TutorialDAtaService {
    getAll(params) {
        return http.get('/api/tutorial/', { params });
    }

    get(id) {
        return http.get(`/api/tutorial/${id}`)
    }

    create(data) {
        console.log(data)
        return http.post(`/api/tutorial/`, data)
    }

    update(id, data) {
        return http.put(`/api/tutorial/${id}`, data)
    }

    delete(id) {
        return http.delete(`/api/tutorial/${id}`)
    }

    deleteAll() {
        return http.delete(`/api/tutorial/`)
    }

    findByTitle(title) {
        return http.get(`/api/tutorial/?title=${title}`)
    }

}

export default new TutorialDAtaService()