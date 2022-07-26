import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch(apiUrl, {
			method: "GET",
			redirect: "follow",
		})
			.then((response) => response.json())
			.then((data) => setList(data))
			.catch((error) => console.log("error", error));
	}, []);

	const taskHandler = (e) => {
		setTask(e.target.value);
	};

	const onKeyEnter = (e) => {
		if (e.keyCode === 13) {
			if (e.target.value === null || e.target.value.trim() === "") {
				alert("You have to add a new task");
			} else {
				submitTask(e);
			}
		}
	};

	const apiUrl =
		"https://assets.breatheco.de/apis/fake/todos/user/brunomorais";

	const submitTask = (e) => {
		e.preventDefault();
		let singleTask = {
			label: task,
			done: false,
		};
		let listOfTasks = [...list, singleTask];
		setList(listOfTasks);
		setTask("");

		fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(listOfTasks),
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		//.catch((error) => console.log("not able to add a task", error));
	};

	const deleteHandler = (index) => {
		let listWithoutItem = [
			...list.slice(0, index),
			...list.slice(index + 1, list.length),
		];
		setList(listWithoutItem);

		fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(listWithoutItem),
		})
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.log("can't delete the task", error));
	};

	const deleteAll = () => {
		let sampleTask = [{ label: "Sample Task", done: false }];
		fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(sampleTask),
		})
			.then((response) => response.json(sampleTask))
			.then((data) => {
				console.log(data);
				console.log(sampleTask);
			})
			.catch((error) => console.log("can't delete the tasks", error));
		window.location.reload();
	};

	return (
		<div className="container col-4 d-flex flex-column align-items-center">
			<span>todos</span>
			<div className="w-100">
				<input
					value={task}
					onChange={taskHandler}
					type="text"
					className="list-group-item w-100 fs-4 py-3 shadow"
					placeholder="What needs to be done?"
					onKeyDown={onKeyEnter}
				/>
			</div>
			<div className="w-100">
				{
					<ul className="list-group shadow">
						{list.length === 0 ? (
							<li className="list-group-item py-3 fs-4">
								No tasks, add a task
							</li>
						) : (
							list.map((list, index) => (
								<li
									className="list-group-item  my-0 py-3 fs-4 d-flex justify-content-between hoverButton"
									key={index}>
									{list.label}
									<button
										onClick={() => {
											deleteHandler(index);
										}}
										type="button"
										className="btn btn-link">
										<i className="fas fa-times"></i>
									</button>
								</li>
							))
						)}
						{list.length === 0 ? (
							<li className="list-group-item py-2 noPaddingLeft">
								{list.length + " items left"}
							</li>
						) : (
							<li className="list-group-item py-2 noPaddingLeft">
								{list.length === 1
									? list.length + " item left"
									: list.length + " items left"}
							</li>
						)}
					</ul>
				}
				<div className="list-group-item shadow bottom"></div>
				<div className="list-group-item shadow bottom-leaf"></div>
				<div className="list-group-item shadow bottom-last"></div>
			</div>
			{
				<div className="mt-3">
					{list.length === 0 ? (
						""
					) : (
						<button
							className="dangerButton"
							type="button"
							onClick={() => deleteAll()}>
							Delete All
						</button>
					)}
				</div>
			}
		</div>
	);
};

export default Home;
