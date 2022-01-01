import { MailPreview } from "./MailPreview.jsx";

export function MailsList({ mails }) {


    // if (!mails.length) return <h3>The mail box is empty</h3>

    return (
        <section className="mail-list flex">
            <tr>{mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}</tr>
        </section>
    )

}