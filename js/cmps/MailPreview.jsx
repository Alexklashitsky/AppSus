const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    // console.log('mail.bodyPreview:', mail.bodyPreview);

    return (
        <Link className="clean-link" to={`/mail/${mail.id}`}>
            <article className="mail-preview flex">
                <div className="from">{mail.from}</div>
                <div className="subject">{mail.subject}</div>
                <div className="bodyPreview">{mail.bodyPreview}</div>



            </article>
        </Link>

    )
}