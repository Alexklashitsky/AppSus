export class MailFilter extends React.Component {
    state = {
        filterBy: {
            search: '',
            folder: '',
        }
    }
    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy.search);
        this.cleanForm();
    };

    handleChange = ({ target }) => {
        const field = target.name
        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy.search, [field]: value } }), () => {
            this.props.onSetFilter(this.state.filterBy.search)
        })
    }


    cleanForm = () => {
        this.setState({ filterBy: { search: '' } });
    };

    render() {
        const { filterBy: { search } } = this.state
        return (
            <form className="mail-filter">
                <label htmlFor="search">
                    <input
                        placeholder="search mail"
                        type="text"
                        name="search"
                        id="search"
                        value={search}
                        onChange={this.handleChange}


                    />

                </label>

            </form>
        )
    }
}

