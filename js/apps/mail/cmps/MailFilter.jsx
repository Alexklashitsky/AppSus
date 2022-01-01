export class MailFilter extends React.Component {
    state = {
        filterBy: {
            search: '',
            folder: 'inbox'
        }

    }


    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value




        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => {

                this.props.onSetFilter(this.state.filterBy)
            })
        // this.setState({ filterBy: { folder: 'all' } });




        // console.log('this.state:', this.state);




        // this.setState((prevState) => ({ filterBy: { ...prevState.filterBy.search, [field]: value } }), () => {
        //     this.props.onSetFilter(this.state.filterBy.search)
        // })
        // this.state.filterBy
        // console.log('this.state.filterBy:', this.state.filterBy);

    }

    onSubmitFilter = (ev) => {
        ev.preventDefault();
        this.props.onSetFilter(this.state.filterBy.search);
        this.cleanForm();
    };


    cleanForm = () => {
        this.setState({ filterBy: { search: '', folder: 'inbox' } });
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

