/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MenuIcon, XIcon, PlayIcon, PencilAltIcon } from '@heroicons/react/outline';
import { FORM_FILL } from "./LineForm";

const Home = () => {
  let history = useHistory();
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const items = window.localStorage.getItem(FORM_FILL);
    if (items) {
      setForms(JSON.parse(items));
    }
  }, []);

  const onUpdateForm = (key) => {
    history.push("/update", { key });
  }

  const onDeleteForm = async (key) => {
    try {
      const localForms = await window.localStorage.getItem(FORM_FILL);
      if (localForms) {
        const parsedValue = JSON.parse(localForms);
        const elementIndex = parsedValue.findIndex(el => el.key === key);
  
        if (elementIndex !== -1) {
          parsedValue.splice(elementIndex, 1);
          await window.localStorage.setItem(FORM_FILL, JSON.stringify(parsedValue));
          setForms(parsedValue);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {forms.map(form => (
        <div key={form.key} className="bg-indigo-600 my-3">
          <div className="max-w-7xl mx-auto py-1 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-0 flex-1 flex items-center">
                <span className="flex p-2 rounded-lg bg-indigo-800">
                  <MenuIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </span>
                <p className="ml-3 font-medium text-white truncate">
                  <span className="md:hidden">{form.key}</span>
                  <span className="hidden md:inline">{form.key}</span>
                </p>
              </div>
              <div className="order-3 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <PlayIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  onClick={() => onUpdateForm(form.key)}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <PencilAltIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <div className="order-1 flex-shrink-0 sm:order-3 sm:ml-3">
                <button
                  onClick={() => onDeleteForm(form.key)}
                  type="button"
                  className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                >
                  <span className="sr-only">Dismiss</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home;