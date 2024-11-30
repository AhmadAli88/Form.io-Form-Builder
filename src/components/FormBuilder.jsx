import { useState } from 'react';
import { ReactFormBuilder, Registry } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

// Custom form elements registration
Registry.register('CustomHeader', () => ({
  render: ({ data }) => (
    <h1 className="text-2xl font-bold mb-4">{data.content}</h1>
  ),
}));

const FormBuilder = () => {
  const [formData, setFormData] = useState([]);
  
  // Toolbar items configuration
  const toolbarItems = [
    {
      key: 'Header',
      element: 'CustomHeader',
      component: 'CustomHeader',
      type: 'custom',
      forwardRef: true,
      name: 'Header Text',
      icon: 'H',
      content: 'Untitled Form'
    },
    {
      key: 'Label',
      name: 'Label',
      icon: 'A',
      static: true,
      content: 'Label',
    },
    {
      key: 'Paragraph',
      name: 'Paragraph',
      static: true,
      icon: '¶',
      content: 'Enter text here...',
    },
    {
      key: 'LineBreak',
      name: 'Line Break',
      static: true,
      icon: '↵',
    },
    {
      key: 'Dropdown',
      canHaveAnswer: true,
      name: 'Dropdown',
      icon: '▼',
      label: 'Dropdown',
      field_name: 'dropdown_',
      options: [],
    },
    {
      key: 'Tags',
      name: 'Tags',
      icon: '#',
      static: true,
    },
    {
      key: 'Checkboxes',
      canHaveAnswer: true,
      name: 'Checkboxes',
      icon: '☐',
      label: 'Checkboxes',
      field_name: 'checkbox_',
      options: [],
    },
    {
      key: 'RadioButtons',
      canHaveAnswer: true,
      name: 'Multiple Choice',
      icon: '○',
      label: 'Multiple Choice',
      field_name: 'radio_',
      options: [],
    },
    {
      key: 'TextInput',
      element: 'TextInput',
      type: 'text',
      name: 'Text Input',
      icon: 'A',
      field_name: 'text_input_',
    },
    {
      key: 'NumberInput',
      element: 'NumberInput',
      type: 'number',
      name: 'Number Input',
      icon: '+',
      field_name: 'number_input_',
    },
    {
      key: 'TextArea',
      element: 'TextArea',
      type: 'text',
      name: 'Multi-line Input',
      icon: 'T',
      field_name: 'textarea_',
    },
    {
      key: 'Image',
      name: 'Image',
      icon: '🖼',
      static: true,
    },
    {
      key: 'Rating',
      name: 'Rating',
      icon: '★',
      field_name: 'rating_',
      label: 'Rating',
    },
    {
      key: 'DatePicker',
      element: 'DatePicker',
      type: 'date',
      name: 'Date',
      icon: '📅',
      field_name: 'date_',
    },
    {
      key: 'Signature',
      element: 'Signature',
      type: 'signature',
      name: 'Signature',
      icon: '✍',
      field_name: 'signature_',
    },
  ];

  // Example form data (similar to the screenshot)
  const initialData = {
    task_data: [
      {
        id: 'header_1',
        element: 'CustomHeader',
        type: 'custom',
        content: 'Scholarship Form',
      },
      {
        id: 'paragraph_1',
        element: 'Paragraph',
        content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry...',
      },
      {
        id: 'dropdown_1',
        element: 'Dropdown',
        required: true,
        label: 'How did you hear about this scholarship?',
        options: [
          { value: 'internet', text: 'Internet' },
          { value: 'friend', text: 'Friend' },
          { value: 'school', text: 'School' },
        ],
      },
      {
        id: 'rating_1',
        element: 'Rating',
        label: 'How hard is the material?',
        options: [
          { value: 1, text: 'Easy' },
          { value: 5, text: 'Difficult' },
        ],
      },
      {
        id: 'checkbox_1',
        element: 'Checkboxes',
        label: 'What is your favorite subject?',
        options: [
          { value: 'math', text: 'Math' },
          { value: 'physics', text: 'Physics' },
          { value: 'english', text: 'English' },
          { value: 'art', text: 'Art' },
        ],
      },
      {
        id: 'signature_1',
        element: 'Signature',
        required: true,
        label: 'Signature of Applicant',
      },
    ],
  };

  const onPost = (data) => {
    setFormData(data.task_data);
    console.log('Form Configuration JSON:', JSON.stringify(data.task_data, null, 2));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Preview</h1>
        <div className="space-x-2">
          <button 
            className="px-4 py-2 border rounded hover:bg-gray-50"
            onClick={() => console.log(JSON.stringify(formData, null, 2))}
          >
            Show JSON
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Preview Form
          </button>
        </div>
      </div>

      <ReactFormBuilder
        onPost={onPost}
        toolbarItems={toolbarItems}
        data={initialData.task_data}
        saveUrl="path/to/save"
      />
    </div>
  );
};

export default FormBuilder;