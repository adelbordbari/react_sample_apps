function Nav(props) {
	const languages = [
		"all",
		"javascript",
		"python",
		"ruby",
		"dart",
		"java",
		"rust",
	];
	return (
		<nav
			className='navbar navbar-expand-lg navbar-light'
			style={{ backgroundColor: "#6ad7ff" }}>
			<div className='container-fluid'>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
						{languages.map((lang) => (
							<li style={{ cursor: "pointer" }}>
								<a
									className='nav-link active'
									key={lang}
									onClick={() => props.onSelectLanguage(lang)}
									style={{ textTransform: "capitalize" }}>
									{lang}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</nav>
	);
}

function Loading() {
	return (
		<div className='d-flex justify-content-center'>
			<div
				className='spinner-border mt-5'
				role='status'
				aria-hidden='true'></div>
		</div>
	);
}

function SearchResults(props) {
	return (
		<div>
			<div className='container'>
				<div className='row'>
					{props.repos.map(({ name, owner, stargazers_count, html_url }) => (
						<div
							className='col my-2 d-flex align-items-stretch'
							key={Math.random()}>
							<div
								className='card text-center shadow'
								style={{ width: "12em"}}
								key={Math.random()}>
								<div className='card-header'>
									<h6>{name}</h6>
								</div>
								<div className='card-body'>
									<h6 className='card-subtitle mb-2 text-muted'>
										@{owner.login}
									</h6>
									<h6 className='card-subtitle mb-2 text-muted'>
										{stargazers_count}
									</h6>
								</div>
								<div class='card-footer bg-transparent'>
									<a
										href={html_url}
										style={{ backgroundColor: "#6ad7ff" }}
										className='btn'>
										Link
									</a>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

class Github extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			repos: [],
			isFetching: true,
			activeLanguage: "all",
		};
	}

	handleSelectLanguage = (lang) => {
		this.setState({
			activeLanguage: lang,
		});
	};

	fetchRepos = (lang) => {
		this.setState({ isFetching: true });
		window.API.fetchRepos(lang).then((repos) => {
			this.setState({ isFetching: false, repos: repos });
		});
	};

	componentDidMount = () => {
		this.fetchRepos(this.state.activeLanguage); //fetch for "all"
	};

	componentDidUpdate = (prevProp, prevState) => {
		if (prevState.activeLanguage !== this.state.activeLanguage) {
			this.fetchRepos(this.state.activeLanguage);
		}
	};
	render() {
		return (
			<div>
				<Nav onSelectLanguage={this.handleSelectLanguage} />
				<div className='jumbotron m-5'>
					<h1
						className='display-4'
						style={{ textTransform: "capitalize" }}>
						<strong>{this.state.activeLanguage}</strong>
					</h1>
					<p className='lead'>
						Here is a list of most liked repositories on Github based on your
						selection:
					</p>
				</div>
				{this.state.isFetching === true ? (
					<Loading />
				) : (
					<SearchResults repos={this.state.repos} />
				)}
				<br /> <br /> <hr />
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<Github />);
