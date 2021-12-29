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
                <Switch>
                    <Route > </Route>
                    <Route component={MisterMail} path="/mail" ></Route>
                    <Route component={MissKeep} path="/keep" ></Route>
                    <Route></Route>



                </Switch>
            </section>
        </Router>
    )
}
