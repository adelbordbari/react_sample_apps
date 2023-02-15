function Tasks(props) {
	return (
		<div className="m-5">
			<h1>Tasks</h1>
			<ul>
				{props.tasks.map((aname) => (
					<li key={Math.random()}>
						<span>{aname} </span>
						<button
							className="btn btn-sm mt-1 mb-1 btn-warning"
							onClick={() => props.onRemoveTask(aname)}
						>
							Remove
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tasks: [],
			input: "",
			loading: true,
		};
	}
	componentDidMount() {
		console.log("--Mounted--");
		API.fetchTasks().then((tasks) => {
			this.setState({
				tasks,
				loading: false,
			});
		});
	}

	componentDidUpdate() {
		console.log("--Updated--");
	}

	componentWillUnmount() {
		console.log("--Will Unmount--");
	}

	handleAddTask = () => {
		this.setState((curState) => {
			return {
				tasks: curState.tasks.concat(this.state.input),
				input: "",
			};
		});
	};

	handleRemoveTask = (name) => {
		this.setState((curState) => {
			return {
				tasks: curState.tasks.filter((t) => t !== name),
			};
		});
	};

	handleClearAll = () => {
		this.setState(() => {
			return { tasks: [] };
		});
	};

	updateInput = (e) => {
		const value = e.target.value;
		console.log(value);
		this.setState({
			input: value,
		});
	};

	render() {
		if (this.state.loading === true) {
			return (
				<div className="d-flex justify-content-center">
					<div
						className="spinner-border mt-5"
						role="status"
						aria-hidden="true"
					></div>
				</div>
			);
		}

		return (
			<div
				className="m-5"
				id="container"
			>
				<button
					type="button"
					className="btn btn-danger"
					onClick={this.handleClearAll}
				>
					Clear All
				</button>
				<div className="mb-3">
					<input
						className="form-control mb-3 mt-3"
						type="text"
						id="newname"
						placeholder="New Task"
						value={this.state.input}
						onChange={this.updateInput}
					/>
					<button
						disabled={this.state.input.length === 0}
						className="btn btn-primary"
						onClick={this.handleAddTask}
					>
						Submit
					</button>
				</div>

				<Tasks
					tasks={this.state.tasks}
					onRemoveTask={this.handleRemoveTask}
					onAddTask={this.handleAddTask}
					onClearAll={this.handleClearAll}
				/>
				<hr />
			</div>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);
