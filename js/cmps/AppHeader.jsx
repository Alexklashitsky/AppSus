
const { NavLink, withRouter } = ReactRouterDOM

export function AppHeader() {
    return (
        <header>
            <h1>
                AppsUs
            </h1>
            <section className="main-nav">
                <NavLink className="clean-link" to="/home">Home</NavLink>
                <NavLink className="clean-link" to="/mail" >Mail</NavLink>
                <NavLink className="clean-link" to="/keep" >Keep</NavLink>
                {/* <NavLink>misBooks</NavLink> */}

            </section>
        </header>
    )

}