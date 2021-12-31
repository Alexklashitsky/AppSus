import { eventBusService } from "../../../services/event-bus.service.js"
import { MailFolders } from "../cmps/MailFolders.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { mailService } from "../../../services/mail.Service.js"
import { Compose } from "../cmps/compose.jsx"

const { Link } = ReactRouterDOM

export class MailDetails extends React.Component {

    state = {
        mail: null,
        show: false,
        folder: "inbox",
        isOnTrash: false



    }
    componentDidMount() {
        this.loadMail()
        var trash = mailService.getTrash()
        console.log('trash:', trash);



        // eventBusService.on('open-trash')




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


    onOpenComposeModal() {
        console.log('gg:');

        eventBusService.emit('open modal', true)
    }

    getId = () => {
        const { id } = this.state.mail
        return id


    }

    onGoBack = () => {
        this.props.history.push('/mail')
    }


    onSentMail = (mail) => {
        // console.log('mail:', mail);
        mailService.sendMail(mail)

    }

    onReplay = () => {
        const id = this.getId()
        // const { id } = this.state.mail
        eventBusService.emit('replay', id)
        console.log('id:', id);
    }

    onForward = () => {
        const id = this.getId()
        eventBusService.emit('forward', id)
    }

    onKeepIt = () => {
        const id = this.getId()
    }

    onTrash = () => {
        const id = this.getId()
        mailService.moveToFolder('trash', id)
        this.onGoBack()
    }

    onArchive = () => {
        const id = this.getId()
        mailService.moveToFolder('archive', id)
        this.onGoBack()
    }

    onSpam = () => {
        const id = this.getId()
        mailService.moveToFolder('spam', id)
        this.onGoBack()
    }






    render() {
        const { mail } = this.state
        if (!mail) return <div className="error">error</div>
        return (

            <section className="mail-details">
                <div className="search-bar flex" >
                    <MailFilter onSetFilter={this.onSetFilter} />
                    <button className="compose" onClick={
                        () => this.onOpenComposeModal('hey')} >compose</button>
                </div>
                {/* <MailFilter onSetFilter={this.onSetFilter} /> */}
                <div className="heder">
                    <h1 className="subject" >{mail.subject}</h1>
                    <img className="burger icon" onClick={this.toggleModal} src="./img/icons/3dots.png" />


                </div>
                <div className="main">
                    {/* <  MailFolders setFolder={this.setFolder} /> */}
                    <Compose onSentMail={this.onSentMail} />
                    <div className="txt">
                        <h4 className="from" >{mail.from}</h4>
                        <p>{mail.body}</p>
                    </div>
                </div>

                <div className={"modal" + " " + "flex " + `${this.state.show === false ? " " : "shown"}`} >
                    <button className="btn" onClick={this.onReplay} >replay</button>
                    <button className="btn" onClick={this.onForward} >forward</button>
                    <button className="btn" onClick={this.onKeepIt} >keep it!</button>
                    <button className="btn" onClick={this.onTrash} >move to trash</button>
                    <button className="btn dis" >print</button>
                    <button className="btn dis" onClick={this.onArchive}>archive</button>
                    <button className="btn " onClick={this.onSpam} >move to spam</button>

                </div>

            </section >
        )

        // + (!this.state.show && "shown")



    }



}

"modal"

// + (this.state.show && "shown")