import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const TodoForm = ({ saveTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onDosageChange = (e) => setDosage(e.target.value);
  const onDueDateChange = (e) => setDueDate(e.target.value);
  const onExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);

  const onSubmit = () => {
    const formData = {
      title,
      description,
      dosage,
      dueDate,
      expiryDate,
      image, // Pass the file object directly to the parent
    };

    saveTodo(formData);

    // Clear the form after submission
    setTitle("");
    setDescription("");
    setDosage("");
    setDueDate("");
    setExpiryDate("");
    setImage(null);
  };

  return (
    <Form>
      <FormGroup>
        <Label for="title">Tablet Name</Label>
        <Input
          id="title"
          name="title"
          placeholder="Enter a tablet name"
          type="text"
          value={title}
          onChange={onTitleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Enter a Description"
          type="textarea"
          value={description}
          onChange={onDescriptionChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="dosage">Dosage</Label>
        <Input
          id="dosage"
          name="dosage"
          placeholder="Dosage"
          type="text"
          value={dosage}
          onChange={onDosageChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="duedate">Manufacturing Date</Label>
        <Input
          id="duedate"
          name="duedate"
          type="date"
          value={dueDate}
          onChange={onDueDateChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="expirydate">Expiry Date</Label>
        <Input
          id="expirydate"
          name="expirydate"
          type="date"
          value={expiryDate}
          onChange={onExpiryDateChange}
        />
      </FormGroup>

      <FormGroup>
        <Label for="image">Upload Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
      </FormGroup>

      <Button color="primary" onClick={onSubmit}>
        Save
      </Button>
    </Form>
  );
};

export default TodoForm;
