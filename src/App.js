import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [term, setTerm] = useState("");
  const [result, setResult] = useState([]);

  useEffect(() => {
    const search = async () => {
      const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: term, 
        },
      });
      // console.log(respond);
      console.log(respond.data.query.search);
      // now I want store this data in result ,
      setResult(respond.data.query.search);
      // console.log("line 23", result);
    };

    const debounceSearch = setTimeout(() => {
      if (term) {
        search();
      }
    }, 1500);
    return () => {
      clearTimeout(debounceSearch);
    };
  }, [term]);

  // fetch data return from api

  const fetchResult = result.map((el) => {
    return (
      <tr key={el.pageid}>
        <th scope="row">#</th>
        <td>{el.title}</td>
        {/* <td>{el.snippet}</td> */}
        <td>
          <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
        </td>
      </tr>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Search Input
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTerm(e.target.value)}
              value={term}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Desc</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <th scope="row">1</th>
                <td>title</td>
                <td>Desc</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>title</td>
                <td>Desc</td>
              </tr>
              <tr>
                <th scope="row">1</th>
                <td>title</td>
                <td>Desc</td>
              </tr> */}
              {fetchResult}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
