import { eventBusService } from "../../../services/event-bus.service.js";
import { mailService } from "../../../services/mail.Service.js"
// import { MailDetails } from "../pages/MailDetails.jsx";
export class Compose extends React.Component {

    state = {
        isModalOpen: false,
        mail: {
            to: '',
            subject: '',
            body: ""

        }
    }

    // removeEventBus

    handleChange = ({ target }) => {
        const field = target.name

        const value = target.value

        // this.setState(() => ({ mail: { [field]: value } }))

        this.setState((prevState) => ({ mail: { ...prevState.mail, [field]: value } }), () => {

            //     // this.props.onSetFilter(this.state.filterBy)
        })




        // const subject
        // const body

    }




    componentDidMount() {
        eventBusService.on('open modal', () => {
            this.setState({ isModalOpen: true })
        })
        eventBusService.on('replay', (id) => {
            this.openReplay(id)

        })

        eventBusService.on('forward', (id) => {
            this.openForward(id)

        })


        // eventBusService.on('open-modal', () => {
        //     this.setState({ isModalOpen: true })

    }

    // componentDidUpdate() {
    //     eventBusService.on('open modal', () => {
    //         this.setState({ isModalOpen: true })
    //     })

    // }





    // componentWillUnmount() {

    //     // closeModal()
    //     // this.removeEventBus()
    // }

    // }

    cleanForm = () => {
        this.setState({ mail: { to: '', subject: '', body: '' } })
    }


    closeModal = () => {
        this.setState({ isModalOpen: false })

    }

    onSubmitMail() {
        this.setState({ isModalOpen: false })
        this.props.onSentMail(this.state.mail);
        this.cleanForm()


    }

    openReplay(id) {
        // eventBusService.on('replay', () => {
        let selectedMail = mailService.getMailByIdN(id)
        this.setState({ mail: { to: selectedMail.from, subject: 'replay' + ' ' + selectedMail.subject, body: selectedMail.body } })


        // mailService.getMailById(id).then(selectedMail, selectedMail = 'rerror')
        // //     console.log('gg');
        // // })

        // mailService.getMailById(id).then(mail => {
        //     if (!mail) return "error"
        //     else
        //         selectedMail = ({ mail })
        // })

        // mailService.getMailById(mailId).then(mail => {
        //     if (!mail) return this.props.history.push('/')
        //     this.setState({ mail })
        // })

        this.setState({ isModalOpen: true })
        // })

    }

    openForward(id) {
        let selectedMail = mailService.getMailByIdN(id)
        this.setState({ mail: { to: "", subject: selectedMail.subject, body: selectedMail.body } })
        this.setState({ isModalOpen: true })
    }

    onDraft(id) {
        this.closeModal()

    }

    componentWillUnmount() {
        // this.removeEventBus()
        // window.removeEventListener('open modal', CustomEvent)
    }

    render() {

        const { mail: { to, subject, body } } = this.state

        return (
            <section className={"compose-modal" + "  " + `${this.state.isModalOpen ? " show" : ""}`} >
                <header>
                    <h3 className="newMsg" >New massage</h3>
                    <button onClick={() => this.onDraft()} className="close-modal">X</button>
                </header>
                <div className="subheader flex">
                    <form
                        className="to flex">
                        <label htmlFor="To">to</label>
                        <input type="text"
                            placeholder=""
                            id="to"
                            name="to"
                            value={to}
                            onChange={this.handleChange}
                        />
                    </form>
                    <form className="subject">
                        <label htmlFor="subject"></label>
                        <input type="text"
                            placeholder="subject"
                            id="subject"
                            name="subject"
                            value={subject}
                            onChange={this.handleChange}
                        />
                    </form>


                </div>
                <form className="body">
                    <label htmlFor="body"></label>
                    {/* <input type="text"
                        placeholder=""
                        id="body"
                        name="body"
                        value={body}
                        onChange={this.handleChange}
                    /> */}

                    <textarea id="body" name="body" value={body} rows="15" cols="45"
                        onChange={this.handleChange}>

                    </textarea>

                </form>
                <button onClick={
                    () => this.onSubmitMail()
                } >send</button>



            </section>
        )
    }
}