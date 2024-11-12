// src/components/FormBuilder.jsx
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

const FormBuilder = () => {
  const handleSave = (data) => {
    console.log("Saved Form Data:", JSON.stringify(data, null, 2));
  };

  return <ReactFormBuilder onPost={handleSave} />;
};

export default FormBuilder;
