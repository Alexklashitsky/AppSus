const { Link } = ReactRouterDOM
import { mailService } from "../../../services/mail.Service.js"

// export function MailPreviewForTrash({ mail }) {
// console.log('mail.bodyPreview:', mail.bodyPreview);

export class MailPreviewForTrash extends React.Component {

    state = {
        mails: null
    }

    componentDidMount() {
        this.loadMails()
    }

    loadMails() {
        const mails = mailService.getTrash()
        // console.log('mails:', mails);


        this.setState(({ mails }))

        // () => console.log('this.state:', this.state))
        // console.log('this.state:', this.state);

    }

    onDeleteMail(mailId) {
        // console.log('mailId:', mailId);
        mailService.deleteMail(mailId)
        this.loadMails()


    }



    render() {

        const mails = this.state.mails
        // console.log('mails:', mails);


        if (!mails) return 'ff'
        return (
            mails.map((mail) => {
                // console.log('mail:', mail)
                return <div className="trash-preview ">
                    <Link className="clean-link" to={`/mail/${mail.id}`}>
                        <div className="form" >{mail.from}</div>
                        <div className="subject"  >{mail.subject}</div>
                        <div className="body" >{mail.bodyPreview}</div>
                    </Link>
                    <img className="bin icon" onClick={() => this.onDeleteMail(mail.id)} src="img\icons\bin.png" />
                </div>

            })
            // return (

            //     <section>ghh</section>




            //     return <article className="mail-preview flex">
            //         <div className="from">{'mail.from'}</div>
            //     </article>




            //       this.state.mails.map((mail) => {
            //     console.log('mail:', mail)
            //     return <article className="mail-preview flex">
            //         <div className="from">{'mail.from'}</div>
            //     </article>

            // })



            // <Link className="clean-link" to={`/mail/${mail.id}`}>
            //     <article className="mail-preview flex">
            //         <div className="from">{mail.from}</div>
            //         <div className="subject">{mail.subject}</div>
            //         <div className="bodyPreview">{mail.bodyPreview}</div>
            //     </article>
            // </Link>




            //  <img className="bin icon" src="img\icons\bin.png" /> 

        )
    }

}