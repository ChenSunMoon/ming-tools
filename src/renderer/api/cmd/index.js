import db from '../../../main/db'
import initData from './init'

export const getAll = () => {
    return new Promise((resolve, reject) => {
        db.find({}).sort({createAt: -1}).exec((err, doc) => {
            if (err) {
                reject(err)
            } else {
                if (doc.length === 0) {
                    db.insert(initData, (err1, doc1) => {
                        if (err1) {
                            reject(err1)
                        } else {
                            resolve(doc1)
                        }
                    })
                } else {
                    resolve(doc)
                }
            }
        })
    })
}
export const insert = (data) => {
    if (typeof data === 'object') {
        data.createAt = Date.now()
    }
    return new Promise((resolve, reject) => {
        db.insert(data, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}
export const update = (_id, data) => {
    return new Promise((resolve, reject) => {
        db.update({_id}, {$set:data}, {}, (err, numReplaced) => {
            if (err) {
                reject(err)
            } else {
                resolve(numReplaced)
            }
        })
    })
}
export const find = (query) => {
    return new Promise((resolve, reject) => {
        db.find(query, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}
export const remove = (id) => {
    return new Promise((resolve, reject) => {
        db.remove({_id: id}, {}, (err, num) => {
            if (err) {
                reject(err)
            } else {
                resolve(num)
            }
        })
    })
}
