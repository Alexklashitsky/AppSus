import { AppHeader } from "./js/cmps/AppHeader.jsx"
import { MisterMail } from "./js/pages/MisterMail.jsx"
import { MissKeep } from "./js/pages/MissKeep.jsx"


const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Switch>
                        {/* <Route > </Route> */}
                        <Route component={MisterMail} path="/mail" />
                        <Route component={MissKeep} path="/keep" />
                        {/* <Route></Route> */}
                    </Switch>
                </main>
            </section>
        </Router>
    )
}
