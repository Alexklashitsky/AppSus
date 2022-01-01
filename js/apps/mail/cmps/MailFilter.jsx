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
        console.log('value:', value);
        console.log('this.props:', this.props);
        console.log('this.state.filterBy.search:', this.state.filterBy);




        this.setState((prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
            () => {
                // console.log('this.setState((prevState):', this.setState((prevState)));

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

