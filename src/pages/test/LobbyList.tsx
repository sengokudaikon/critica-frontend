import { useEffect, useState } from "react";
import api, { useGetAccessToken } from "../../utils/api";

function LobbyList() {
  const [isTokenReady] = useGetAccessToken();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    if (!isTokenReady) return;
    setLoading(true);
    api.get('lobby/list')
    .then(({data}) => {
      setData(data);
    })
    .catch(error => {
      console.log('error:', error);
      setData([]);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [isTokenReady]);

  const [busy, setBusy] = useState(false);
  function createLobby() {
    setBusy(true);
    api.post('/lobby/create')
    .then((response) => {
      console.log(response);
      setBusy(false);
      setLoading(true);
      return api.get('lobby/list')
    })
    .then(({data}) => {
      setData(data);
    })
    .catch(error => {
      console.log('error:', error);
      setData([]);
    })
    .finally(() => {
      setBusy(false);
      setLoading(false);
    })
  }

  return (
    <>
      {!isTokenReady
        ? <div>token is not ready</div>
        : loading
        ? <div>loading...</div>
        : data.length === 0
        ? <div>empty list</div>
        : <ul>
          {data.map(item =>
            <li>{String(item)}</li>
          )}
        </ul>
      }
      <button
        disabled={!isTokenReady || busy}
        onClick={createLobby}>
        Create new lobby
      </button>
    </>
  )
}

export default LobbyList