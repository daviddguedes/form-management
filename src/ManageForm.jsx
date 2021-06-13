import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LineForm, { FORM_FILL } from "./LineForm";

const ManageForm = () => {
  let history = useHistory();
  const [update, setUpdate] = useState(false);
  const [state, setState] = useState(null);

  useEffect(() => {
    async function getState() {
      const localForms = await window.localStorage.getItem(FORM_FILL);
      if (localForms) {
        const localState = history.location?.state;
        if (localState) {
          const parsedValue = JSON.parse(localForms);
          const element = parsedValue.find(el => el.key === localState.key);
          if (element) {
            setState({
              key: element.key,
              values: element.values
            });
            setUpdate(true);
          }
        } else {
          setUpdate(false);
          setState(null)
        }
      }
    }

    getState();
  }, [history.location]);
  
  return (
    <div>
      <LineForm update={update} state={state} />
    </div>
  )
}

export default ManageForm;