import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../../../services/mail.Service.js"

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
        } else this.setState({ show: false })


    };


    render() {
        const { mail } = this.state
        if (!mail) return <div className="error">error</div>
        return (

            <section className="mail-details">
                <MailFilter onSetFilter={this.onSetFilter} />
                <div className="heder">
                    <h1>{mail.subject}</h1>
                    <img className="burger icon" onClick={this.toggleModal} src="./img/icons/3dots.png" />


                </div>
                <div className="main">
                    <h4>{mail.from}</h4>
                    <p>{mail.body}</p>
                </div>

                <div className={"modal" + " " + "flex " + `${this.state.show === false ? " " : "shown"}`} >
                    <button className="btn" onClick={this.replay} >replay</button>
                    <button className="btn" onClick={this.replay} >forward</button>
                    <button className="btn" onClick={this.replay} >keep it!</button>
                    <button className="btn" onClick={this.replay} >move to trash</button>
                    <button className="btn dis" >print</button>
                    <button className="btn dis" >archive</button>
                    <button className="btn dis" >move to junk</button>

                </div>

            </section >
        )

        // + (!this.state.show && "shown")



    }



}

"modal"

// + (this.state.show && "shown")