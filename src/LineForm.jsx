import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import LineFormItem from "./LineFormItem";

const initialInput = {
  id: uuidv4(),
  type: "id",
  name: '',
  value: ''
}

export const FORM_FILL = 'form-fill';

const LineForm = ({ update, state }) => {
  const [formName, setFormName] = useState('');
  const [countInputs, setCountInputs] = useState([initialInput]);
  const [message, setMessage] = useState({ show: false, text: '' });

  useEffect(() => {
    if (update && state) {
      setFormName(state.key);
      setCountInputs(state.values);
    } else {
      setFormName('');
      setCountInputs([initialInput]);
      setMessage({ show: false, text: '' });
    }
  }, [update, state]);

  const handleAddInput = (event, id) => {
    const index = countInputs.findIndex(el => el.id === id);
    if (index === -1) return;

    const newLine = { ...initialInput, id: uuidv4() };
    countInputs.splice(index + 1, 0, newLine);
    setCountInputs([...countInputs]);
  };

  const handleDeleteInput = (event, id) => {
    if (countInputs.length < 2) return;
    const index = countInputs.findIndex(el => el.id === id);
    if (index === -1) return;

    countInputs.splice(index, 1);
    setCountInputs([...countInputs]);
  };

  const handleChangeValue = (value) => {
    if (!value) return;

    const index = countInputs.findIndex(el => el.id === value.id);
    if (index === -1) return;

    countInputs[index] = { ...value }
    // setCountInputs([...countInputs]);
  };

  const handleSaveForm = async () => {
    if (formName === '') return;

    const localForms = await window.localStorage.getItem(FORM_FILL);
    if (localForms) {
      const parsedValue = JSON.parse(localForms);
      const elementIndex = parsedValue.findIndex(el => el.key === formName);

      if (elementIndex !== -1 && !update) {
        setMessage({ show: true, color: 'red', text: 'This form already exists. Try another name.' });
      } else if (update) {
        const elementUpdateIndex = parsedValue.findIndex(el => el.key === state.key);
        if (elementUpdateIndex !== -1) {
          parsedValue[elementUpdateIndex] = { key: formName, values: countInputs };
          await window.localStorage.setItem(FORM_FILL, JSON.stringify(parsedValue));
          setMessage({ show: true, color: 'blue', text: 'It was successfully updated.' });
        }
      } else {
        parsedValue.push({ key: formName, values: countInputs });
        await window.localStorage.setItem(FORM_FILL, JSON.stringify(parsedValue));
        setMessage({ show: true, color: 'green', text: 'Success!' });
      }
    } else {
      const formData = [{ key: formName, values: countInputs }];
      await window.localStorage.setItem(FORM_FILL, JSON.stringify(formData));
    }
  };

  return (
    <div>
      {message.show && <div className={`bg-${message.color}-100 col-span-8 sm:col-span-8 lg:col-span-6 p-2 my-4`}>
        <span className={`text-${message.color}-500`}>{message.text}</span>
      </div>}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-8 sm:col-span-8 lg:col-span-6 my-4">
          <label htmlFor="form-name" className="block text-sm font-medium text-gray-700">
            Form Name
          </label>
          <input
            onChange={(event) => setFormName(event.target.value)}
            value={formName}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-4 sm:col-span-4 lg:col-span-2 my-4 flex items-end">
          <button
            disabled={formName === ''}
            onClick={handleSaveForm}
            className={`inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
          >
            {update ? 'Update Form' : 'Save Form'}
          </button>
        </div>
      </div>

      {countInputs
        .map(item =>
          <LineFormItem
            key={item.id}
            id={item.id}
            onAddItem={handleAddInput}
            onDeleteItem={handleDeleteInput}
            onChangeLineItem={handleChangeValue}
            stateUpdate={countInputs}
            update={update}
          />)}
    </div>
  )
}

export default LineForm;