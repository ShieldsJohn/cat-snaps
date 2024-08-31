import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { axiosReq } from '../../api/axiosDefaults';
import styles from "../../styles/ContactForm.module.css";
import btnStyles from "../../styles/Button.module.css";


const ContactForm = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const currentUser = useCurrentUser();
  const history = useHistory();

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Redirect to the login page if not authenticated
    if (!currentUser) {
      history.push('/signin');
      return;
    }

    try {
      await axiosReq.post('/contact/', formData);
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      if (error.response?.status === 401) {
        history.push('/signin');
      } else {
        setErrors(error.response?.data || {});
      }
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    history.push('/');
  };

  // Check if currentUser is loading and display a loading state while fetching user data
  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  // Redirect to home page if the user is not authenticated
  if (!currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className={styles.input}
          />
          {errors.subject && <p>{errors.subject}</p>}
        </div>

        <div className={styles.formGroup}>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            maxLength={1000}
            rows={8}
            className={styles.messageBox}
          />
          {errors.message && <p>{errors.message}</p>}
        </div>

        <button type="submit" className={`${btnStyles.Button} ${btnStyles.Blue}`}>Send</button>
        <button type="button" onClick={handleCancel} className={`${btnStyles.Button} ${btnStyles.Blue}`}>Cancel</button>
      </form>
    </div>
  );
};

export default ContactForm;
