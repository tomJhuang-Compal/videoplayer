//@ts-nocheck
import { useState, useRef, useEffect } from 'react';

const JSONEditor = ({ data, onChangeValue }) => {
  const [inputData, setInputData] = useState(data);
  const editor = useRef(null);

  const onChange = (newValue: InputEvent) => {
    const changeValue = newValue.target.value;

    setInputData(changeValue);
  };

  const formatText = (spacing = 0) => {
    try {
      const current = JSON.parse(inputData);
      editor.current.value = JSON.stringify(current, null, spacing);
      setInputData(current);
      onChangeValue(current);
    } catch (err) {
      // alert("No");
    }
  };

  useEffect(() => {
    formatText(2);
  });
  return (
    <div>
      <textarea
        ref={editor}
        style={{
          width: '500px',
          height: 500,
          backgroundColor: '#000080',
          color: 'white',
          fontWeight: 800,
        }}
        placeholder="Placeholder Text"
        onChange={onChange}
        defaultValue={JSON.stringify(data, null, 2)}
      />
    </div>
  );
};

export default JSONEditor;
