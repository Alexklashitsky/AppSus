import { eventBusService } from "../../../services/event-bus.service.js"
import { Compose } from "../cmps/compose.jsx"
import { MailFolders } from "../cmps/MailFolders.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailsList } from "../cmps/MailList.jsx"
import { mailService } from "../../../services/mail.Service.js"
import { TrashList } from "../cmps/TrashList.jsx"
// import { eventBusService } from "../services/event-bus.service"
const { Link } = ReactRouterDOM
export class MisterMail extends React.Component {

    state = {
        mails: null,
        folder: 'inbox',
        filterBy: null,
        isModalShown: false,
        trashIsShown: false

    }
    componentDidMount() {

        this.loadMails()
        // this.isTrashShown()
        eventBusService.on('open-trash', () => {
            this.isTrashShown()
        })
        // eventBusService.on('open-folder', folder)
        // eventBusService.on('open-modal', onOpenModal())



    }


    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy).then(mails => {
            // eventBusService.emit('mail-count', mails.length)
            this.setState({ mails })
        })
    }
    onSetFilter = (filterBy) => {
        console.log(filterBy);
        this.setState({ filterBy }, this.loadMails)

    }

    // get mailsToDisplay() {
    //     const { mails } = this.state.mails
    //     // const ctg = this.ctgSearchParam
    //     return mails
    // }

    isTrashShown = () => {
        if (mailService.getFolder() === 'trash') {
            this.setState({ trashIsShown: true })
            console.log('true');
        }
        else {
            this.setState({ trashIsShown: false })
            console.log('false');
        }
        console.log('this.state:', this.state);


    }

    setFolder = (folder) => {
        this.setState({ folder }, this.loadMails())
        console.log('this.state:', this.state);
        this.loadMails()
    }

    onOpenModal() {

        this.setState({ isModalShown: true })
        eventBusService.emit('open modal', true)
        // console.log('this.setState:', this.State.isModalShown);



    }

    onSentMail = (mail) => {
        // console.log('mail:', mail);
        mailService.sendMail(mail)


    }

    componentWillUnmount() {
        console.log('main unmount');
    }

    render() {
        const { mails } = this.state
        const test = '<MailsList mails={mails} />'


        // console.log('mails:', mails);


        // console.log('this.state.mails:', this.state.mails)
        if (!mails) return <h2> empty</h2>
        if (!this.state.trashIsShown) {
            return (

                <section className="mister-mail">
                    <div className="search-bar flex" >
                        <MailFilter onSetFilter={this.onSetFilter} />
                        <button className="compose" onClick={() => this.onOpenModal()} >compose</button>
                    </div>
                    <main className="main flex">
                        <div className="mail-folders">
                            <  MailFolders setFolder={this.setFolder} />
                        </div>
                        <MailsList mails={mails} />
                        <Compose onSentMail={this.onSentMail} />
                    </main>
                </section>
            )
        } else return (
            <section className="mister-mail">
                <div className="search-bar flex" >
                    <MailFilter onSetFilter={this.onSetFilter} />
                    <button className="compose" onClick={() => this.onOpenModal()} >compose</button>
                </div>
                <main className="main flex">
                    <div className="mail-folders">
                        <  MailFolders setFolder={this.setFolder} />
                    </div>
                    <TrashList mails={mails} />
                    <Compose onSentMail={this.onSentMail} />
                </main>
            </section>
        )
    }

}