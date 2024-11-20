import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dosage, setDosage] = useState("");  // Separate state for dosage
  const [dueDate, setDueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [image, setImage] = useState(null);


  const onTitleChange = (e) => setTitle(e.target.value);
  const onDescriptionChange = (e) => setDescription(e.target.value);
  const onDosageChange = (e) => setDosage(e.target.value);  // handler for dosage
  const onDueDateChange = (e) => setDueDate(e.target.value);
  const onExpiryDateChange = (e) => setExpiryDate(e.target.value);
  const onImageChange = (e) => setImage(e.target.files[0]);

  const onSubmit = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("dosage", dosage);
  formData.append("dueDate", dueDate);
  formData.append("expiryDate", expiryDate);
  if (image) formData.append("image", image);

  // Example API call
  fetch("/api/todos", {
    method: "POST",
    body: formData,
  }).then(response => response.json())
    .then(data => console.log("Success:", data))
    .catch(error => console.error("Error:", error));
};

  return (
    <Form onSubmit={onSubmit}>
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
          type="textarea"
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

      <Button color="primary" type="submit" onClick={() => console.log("Button clicked")}>Save</Button>
    </Form>
  );
};

// Export statement at the top level
export default TodoForm;

