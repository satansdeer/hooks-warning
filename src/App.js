import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./App.css";

class ClassComponent extends React.Component {
  _isMounted = false;
  state = { data: null };

  componentDidMount() {
    this._isMounted = true;
    axios
      .get("https://hn.algolia.com/api/v1/search?query=react")
      .then(result => {
        // if (this._isMounted) {
          this.setState({
            data: result.data.hits
          });
        // }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return <div>Component with data</div>;
  }
}

// const Component = () => {
//   const [, setData] = React.useState([]);

//   React.useEffect(() => {
//     let isMounted = true;
//     axios
//       .get("https://hn.algolia.com/api/v1/search?query=react")
//       .then(result => {
//         if (isMounted) {
//           setData({
//             data: result.data.hits
//           });
//         }
//       });
//     return () => (isMounted = false);
//   }, []);

//   return <div>Functional component</div>;
// };

function App() {
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setAmount(n => n + 1);
    }, 5);
  }, []);

  return (
    <div className="App">
      {[...Array(amount).keys()].map(id =>
        id < amount - 10 ? null : <ClassComponent key={id} />
      )}
    </div>
    // <div className="App">
    //   {[...Array(amount).keys()].map(id => (id < amount - 10 ? null : <div key={id}>Component</div>))}
    // </div>
  );
}

export default App;
