import { mailService } from "../services/mail.Service.js"

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {

    state = {
        mail: null
    }
    componentDidMount() {
        this.loadMail()
        console.log('det');

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.mailId !== this.props.match.params.mailId) {
            this.loadMail()
        }
    }

    loadMail = () => {
        const { mailId } = this.props.match.params
        console.log('mailId:', mailId);


        mailService.getMailById(mailId).then(mail => {
            if (!mail) return this.props.history.push('/')
            this.setState({ mail })
        })
    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }

    onRemoveMail = () => {
        const { id } = this.state.mail
        mailService.removeMail(id).then(() => {
            // eventBusService.emit('user-msg', { txt: 'mail is deleted !' })
            this.onGoBack()
        })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div className="error">error</div>
        return (
            <section>
                <h1>{mail.subject}</h1>
                <h4>{mail.from}</h4>
                <p>{mail.body}</p>
            </section>
        )





    }



}

