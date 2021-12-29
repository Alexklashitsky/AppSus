import { MailsList } from "../cmps/mailList.jsx"
import { mailService } from "../services/mail.Service.js"
import { eventBusService } from "../services/event-bus.service"
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
            eventBusService.emit('mail-count', mails.length)
            this.setState({ mails })
        })
    }

    render() {

        return (
            <section>
                <table className="mail-table">
                    {/* <MailsList mails={this.state.mails} /> */}


                </table>
            </section>
        )
    }

}