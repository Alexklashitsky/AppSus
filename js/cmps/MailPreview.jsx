const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <Link className="clean-link" to={`/mail/${mail.id}`}>
            <article className="mail-preview">
                <div className="from">{mail.from}</div>
                <div className="subject">{mail.subject}</div>


            </article>
        </Link>

    )
}