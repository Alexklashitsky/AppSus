import { utilService } from "./util.service.js"
import { storageService } from "./storage.service.js"

export const mailService = {
    creteMails,
    query,
    getMailById
}

const KEY = 'mailDB'
const loggedInUser = {
    email: 'puki@appsus.com',
    fullName: 'puki ben react'
}



function _createMail(from, subject, body, sentAt, to) {
    const mail = {
        id: utilService.makeId(),
        from,
        subject,
        body,
        bodyPreview: body.slice(0, 25),
        isRead: false,
        sentAt,
        to,
        isInTrash: false,
        currentFolder: 'inbox'
    }
    return mail
}


function creteMails() {
    let mails = _loadMailsFormStorage()
    if (!mails || !mails.length) {
        // mails = []
        mails = _createDemoMails()
    }
    console.log('mails:', mails);




}
function query(filterBy = null) {
    console.log('query');
    const mails = _loadMailsFormStorage()
    if (!mails) creteMails()
    if (!filterBy) return Promise.resolve(mails)
    const filteredMails = _getFilteredMails(mails, filterBy)
    console.log('filteredMails:', filteredMails);

    return Promise.resolve(filteredMails)

}

function saveMail(mailToSave) {
    return mailToSave.id ? _updateCar(mailToSave) : _addCar(mailToSave)
}



function _addMail(mailToSave) {
    let mails = _loadMailsFormStorage()
    var mail = _createMail(mailToSave)
    mails = [mail, ...mails]
    _saveSaveToStorage(mails);
    return Promise.resolve()
}

function _updateMail(mailToSave) {
    const mails = _loadMailsFormStorage()
    var mailIdx = mails.findIndex(function (mail) {
        return mail.id === mailToSave.id;
    })
    mails[mailIdx] = mailToSave
    _savaMailsToStorage(mails);
    return Promise.resolve()
}

function deleteMail(mailId) {
    let mails = _loadMailsFormStorage()
    mails = mails.filter(mail => mail.id !== mailId)
    _savaMailsToStorage(mails);
    return Promise.resolve()
}

function getMailById(mailId) {
    const mails = _loadMailsFormStorage()
    var mail = mails.find(function (mail) {
        return mailId === mail.id
    })
    return Promise.resolve(mail)

}

function _createDemoMails() {
    const mail1 = _createMail('muki', 'The', utilService.makeLorem(), '1639993636000', 'puki@appsus.com')
    const mail2 = _createMail('fofo', 'Most', utilService.makeLorem(), '1639820836000', 'puki@appsus.com')
    const mail3 = _createMail('shabi', 'Effective', utilService.makeLorem(), '1639842436000', 'puki@appsus.com')
    const mail4 = _createMail('lala', 'Way', utilService.makeLorem(), '1639842436000', 'puki@appsus.com')
    const mail5 = _createMail('Yaron', 'To', utilService.makeLorem(), '1637250976000', 'puki@appsus.com')
    const mail6 = _createMail('muki', 'Do', utilService.makeLorem(), '1637248336000', 'puki@appsus.com')
    const mail7 = _createMail('Stav', 'It', utilService.makeLorem(), '1605712336000', 'puki@appsus.com')
    const mail8 = _createMail('Dafna', 'Is', utilService.makeLorem(), '1605712096000', 'puki@appsus.com')
    const mail9 = _createMail('Anna', 'To', utilService.makeLorem(), '1605712122000', 'puki@appsus.com')
    const mail10 = _createMail('Tomy', 'Do', utilService.makeLorem(), '1600441722000', 'puki@appsus.com')
    const mail11 = _createMail('Asaf', 'It', utilService.makeLorem(), '1599664122000', 'puki@appsus.com')
    const mails = [
        mail1,
        mail2,
        mail3,
        mail4,
        mail5,
        mail6,
        mail7,
        mail8,
        mail9,
        mail10,
        mail11
    ]
    _savaMailsToStorage(mails)
}

function _getFilteredMails(mails, filterBy) {
    let { from, to, date } = filterBy
    from = from ? from : null
    to = to ? to : null
    return mails.filter(mail => {
        return mail.to.includes(to) && mail.from.includes(from)
    })
}

function _savaMailsToStorage(mails) {
    storageService.saveToStorage(KEY, mails)

}

function _loadMailsFormStorage() {
    return storageService.loadFromStorage(KEY)

}