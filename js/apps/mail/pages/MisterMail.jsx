import { MailFolders } from "../cmps/MailFolders.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailsList } from "../cmps/MailList.jsx"
import { mailService } from "../../../services/mail.Service.js"
// import { eventBusService } from "../services/event-bus.service"
const { Link } = ReactRouterDOM
export class MisterMail extends React.Component {

    state = {
        mails: null,
        mailFolder: 'inbox',
        filterBy: null

    }
    componentDidMount() {

        this.loadMails()



    }


    loadMails = () => {
        const { filterBy } = this.state
        mailService.query(filterBy).then(mails => {
            // eventBusService.emit('mail-count', mails.length)
            this.setState({ mails })
        })
    }

    // get mailsToDisplay() {
    //     const { mails } = this.state.mails
    //     // const ctg = this.ctgSearchParam
    //     return mails
    // }

    render() {
        const { mails } = this.state
        console.log('mails:', mails);


        console.log('this.state.mails:', this.state.mails)
        if (!mails) return <h2> empty</h2>
        return (


            <section>


                <MailFilter onSetFilter={this.onSetFilter} />
                <MailFolders />
                <MailsList mails={mails} />




            </section>
        )
    }

}