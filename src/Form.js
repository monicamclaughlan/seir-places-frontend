import React from "react";

const Form = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.place);

  //FUNCTIONS
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent Form from Refreshing
    props.handleSubmit(formData); // Submit to Parents desired function
    props.history.push("/"); //Push back to display page 
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        name="img"
        placeholder="image"
        value={formData.img}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        value={formData.description}
        onChange={handleChange}
      />

      <input type="submit" value={props.label} />
    </form>
  );
};

export default Form;
