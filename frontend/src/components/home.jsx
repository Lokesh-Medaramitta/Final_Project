import { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import TodoForm from "./todo-form";

const API_URL = process.env.REACT_APP_API_URL;

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      getTodos();
    };
    getData();
  }, []);

  const getTodos = async () => {
    try {
      const res = await axios.get(`${API_URL}/todos`);
      setTodos(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (id) => {
    try {
      await axios.patch(`${API_URL}/todos/${id}`, {
        is_complete: true,
      });
      await getTodos();
    } catch (err) {
      console.log("epic fail", err);
    }
  };

  const handleNewTodo = async (todo) => {
    try {
      const formData = new FormData();
      formData.append("title", todo.title);
      formData.append("description", todo.description);
      formData.append("dosage", todo.dosage);
      formData.append("dueDate", todo.dueDate);
      formData.append("expiryDate", todo.expiryDate);
      if (todo.image) formData.append("image", todo.image);

      await axios.post(`${API_URL}/todos`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await getTodos();
      setModalOpen(false);
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle tag="h1">Todos</CardTitle>
          <ListGroup>
            {todos.map((todo) => {
              return (
                <ListGroupItem
                  title="Click this to complete."
                  key={todo._id}
                  action
                  tag="a"
                >
                  <div className="d-flex w-100 justify-content-between">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handleClick(todo._id)}
                        value="foobar"
                        defaultChecked={todo.is_complete}
                      />
                    </div>
                    <h5>{todo.title}</h5>
                    <small>
                      Due: {todo.dueDate} | Expiry: {todo.expiryDate}
                    </small>
                  </div>
                  <p className="mb-1">{todo.description}</p>
                  <p className="mb-1">Dosage: {todo.dosage}</p>
                  {todo.image && (
                    <img
                      src={`${API_URL}/uploads/${todo.image}`}
                      alt={todo.title}
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  )}
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <Button onClick={() => setModalOpen(true)} color="primary">
            Add Todo
          </Button>
        </CardBody>
      </Card>
      <Modal isOpen={modalOpen}>
        <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
          Add new Todo
        </ModalHeader>
        <ModalBody>
          <TodoForm saveTodo={handleNewTodo} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Home;
