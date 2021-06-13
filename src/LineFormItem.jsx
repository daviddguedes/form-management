import { memo, useEffect, useState } from "react";

const LineFormItem = ({ id, onAddItem, onDeleteItem, onChangeLineItem, stateUpdate, update }) => {
  const [attribute, setAttribute] = useState('id');
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    if (update) {
      const element = stateUpdate.find(el => el.id === id);
      setAttribute(element.attribute);
      setName(element.name);
      setValue(element.value);
    }
  }, [update, stateUpdate, id]);

  useEffect(() => {
    if (name !== '' && value !== '') {
      onChangeLineItem({ attribute, name, value, id });
    };
  }, [id, attribute, name, value, onChangeLineItem]);

  return (
    <div className="shadow overflow-hidden">
      <div className="px-4 py-5 bg-white sm:p-3">

        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 sm:col-span-2 lg:col-span-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Attribute
            </label>
            <select
              onChange={(event) => setAttribute(event.target.value)}
              value={attribute}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="id">ID</option>
              <option value="class">Class</option>
              <option value="name">Name</option>
            </select>
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(event) => setName(event.target.value)}
              value={name}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-12 sm:col-span-4 lg:col-span-6">
            <label htmlFor="value" className="block text-sm font-medium text-gray-700">
              Value
            </label>
            <input
              onChange={(event) => setValue(event.target.value)}
              value={value}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="col-span-12 sm:col-span-1 lg:col-span-1 flex items-end">
            <button
              onClick={(e) => onAddItem(e, id)}
              className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add
            </button>
          </div>

          <div className="col-span-12 sm:col-span-1 lg:col-span-1 flex items-end">
            <button
              onClick={(e) => onDeleteItem(e, id)}
              className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default memo(LineFormItem);