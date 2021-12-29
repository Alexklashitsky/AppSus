import { MailPreview } from "./MailPreview.jsx";

export function MailsList({ mails }) {
    console.log('test');
    console.log('mails:', mails);

    // if (!mails.length) return <h3>The mail box is empty</h3>

    return (
        <section className="mail-list">
            {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
        </section>
    )

}