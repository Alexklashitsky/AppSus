import { mailService } from "../services/mail.Service.js"

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {

    state = {
        mail: null,
        show: false

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
    toggleModal = () => {
        console.log(this.state.show);
        if (!this.state.show) {
            this.setState({ show: true });
            console.log(this.state.show);

        }
    };


    render() {
        const { mail } = this.state
        if (!mail) return <div className="error">error</div>
        return (
            <section className="mail-details">
                <div className="heder">
                    <h1>{mail.subject}</h1>
                    <img className="burger icon" onClick={this.toggleModal} src="./img/icons/3dots.png" />


                </div>
                <div className="main">
                    <h4>{mail.from}</h4>
                    <p>{mail.body}</p>
                </div>

                <div className={"modal" + " " + `${this.state.show === false ? " " : "shown"}`} >hghghg</div>

            </section >
        )

        // + (!this.state.show && "shown")



    }



}

"modal"

// + (this.state.show && "shown")