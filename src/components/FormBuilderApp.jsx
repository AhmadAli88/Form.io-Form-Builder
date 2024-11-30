import  { useState, useCallback, useRef } from 'react';
import { ReactFormBuilder, ReactFormGenerator } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';

// Comprehensive Toolbar Items
const customToolbarItems = [
  {
    key: 'Header',
    name: 'Header Text',
    icon: 'fa fa-header',
    type: 'Header',
    props: {
      text: 'Header',
      field_name: 'header_text'
    }
  },
  {
    key: 'TextInput',
    name: 'Text Input',
    icon: 'fa fa-font',
    type: 'TextInput',
    props: {
      label: 'Text Input',
      field_name: 'text_input',
      required: false,
      placeholder: 'Enter text'
    }
  },
  {
    key: 'NumberInput',
    name: 'Number Input',
    icon: 'fa fa-hashtag',
    type: 'NumberInput',
    props: {
      label: 'Number Input',
      field_name: 'number_input',
      required: false,
      min: 0,
      max: 100
    }
  },
  {
    key: 'Textarea',
    name: 'Text Area',
    icon: 'fa fa-text-height',
    type: 'Textarea',
    props: {
      label: 'Text Area',
      field_name: 'textarea',
      required: false,
      placeholder: 'Enter long text'
    }
  },
  {
    key: 'Dropdown',
    name: 'Dropdown',
    icon: 'fa fa-caret-square-o-down',
    type: 'Dropdown',
    props: {
      label: 'Dropdown',
      field_name: 'dropdown',
      required: false,
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ]
    }
  },
  {
    key: 'Checkboxes',
    name: 'Checkboxes',
    icon: 'fa fa-check-square-o',
    type: 'Checkboxes',
    props: {
      label: 'Checkboxes',
      field_name: 'checkboxes',
      required: false,
      options: [
        { value: 'checkbox1', label: 'Checkbox 1' },
        { value: 'checkbox2', label: 'Checkbox 2' },
      ]
    }
  },
  {
    key: 'RadioButtons',
    name: 'Radio Buttons',
    icon: 'fa fa-dot-circle-o',
    type: 'RadioButtons',
    props: {
      label: 'Radio Buttons',
      field_name: 'radio_buttons',
      required: false,
      options: [
        { value: 'radio1', label: 'Radio 1' },
        { value: 'radio2', label: 'Radio 2' },
      ]
    }
  },
  {
    key: 'FileUpload',
    name: 'File Upload',
    icon: 'fa fa-upload',
    type: 'FileUpload',
    props: {
      label: 'File Upload',
      field_name: 'file_upload',
      required: false
    }
  },
  {
    key: 'EmailInput',
    name: 'Email Input',
    icon: 'fa fa-envelope',
    type: 'EmailInput',
    props: {
      label: 'Email',
      field_name: 'email_input',
      required: false,
      placeholder: 'Enter email address'
    }
  }
];

function ComprehensiveFormBuilder() {
  // State Management
  const [formData, setFormData] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef(null);

  // Improved Form Data Tracking
  const handleFormUpdated = useCallback((data) => {
    // Ensure we capture all form elements
    const cleanedData = data.task_data || data;
    
    // Validate and process form data
    if (Array.isArray(cleanedData)) {
      const processedData = cleanedData.map((item, index) => ({
        ...item,
        uniqueId: `field_${Date.now()}_${index}`
      }));
      
      setFormData(processedData);
    }
  }, []);

  // Comprehensive JSON Export
  const exportFormToJSON = () => {
    if (!formData || formData.length === 0) {
      alert('No form elements to export');
      return;
    }

    const exportData = {
      id: `form_${Date.now()}`,
      version: '1.0.0',
      createdAt: new Date().toISOString(),
      fields: formData
    };

    const jsonData = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `form_configuration_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Advanced JSON Import
  const importFormFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        // Validate imported JSON
        if (!importedData.fields || !Array.isArray(importedData.fields)) {
          throw new Error('Invalid form configuration');
        }

        // Restore form elements
        const restoredElements = importedData.fields.map((field, index) => ({
          ...field,
          uniqueId: `imported_field_${Date.now()}_${index}`
        }));

        setFormData(restoredElements);
        alert('Form imported successfully!');
      } catch (error) {
        console.error('Import Error:', error);
        alert('Failed to import form. Please check the JSON file.');
      }
    };
    fileReader.readAsText(file);
  };

  // Toggle Preview Mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Render Form Builder or Preview
  const renderFormContent = () => {
    if (previewMode) {
      return (
        <div className="form-preview-container">
          <ReactFormGenerator 
            form_action="/"
            form_method="POST"
            answer_data={{}}
            data={formData}
            onSubmit={(submission) => {
              console.log('Form Submission:', submission);
              // Implement your submission logic
              alert('Form Submitted! Check console for details.');
            }}
            submitButtonText="Submit Form"
          />
        </div>
      );
    }

    return (
      <ReactFormBuilder
        toolbarItems={customToolbarItems}
        onChange={handleFormUpdated}
      />
    );
  };

  return (
    <div className="comprehensive-form-builder">
      <div className="form-builder-controls">
        <button 
          onClick={exportFormToJSON}
          disabled={!formData || formData.length === 0}
        >
          Export to JSON
        </button>
        
        <label className="import-json-label">
          Import JSON
          <input 
            type="file" 
            ref={fileInputRef}
            accept=".json" 
            onChange={importFormFromJSON}
            className="import-json-input"
          />
        </label>
        
        <button 
          onClick={togglePreviewMode}
          disabled={!formData || formData.length === 0}
        >
          {previewMode ? 'Edit Form' : 'Preview Form'}
        </button>
      </div>

      <div className="form-builder-content">
        {renderFormContent()}
      </div>

      {/* Form Data Configuration Display */}
      {formData.length > 0 && !previewMode && (
        <div className="form-configuration-preview">
          <h3>Current Form Configuration:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default ComprehensiveFormBuilder;