import { utilService } from "./util.service.js"
import { storageService } from "./storage.service"

function createMail(subject, body, sentAt, to) {
    const mail = {
        id: utilService.makeId(),
        subject,
        body,
        isRead: false,
        sentAt,
        to,
    }
    return mail
}

const KEY = 'mailDB'

function creteMails() {

}


function _savaMailsToStorage(mail) {
    storageService.saveToStorage(KEY, mail)

}

function _loadMailsFormStorage() {
    return storageService.loadFromStorage(KEY)

}