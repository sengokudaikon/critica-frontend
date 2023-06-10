import axios from "axios";

const baseUrl = '/api/lobby/'

type Lobby = {
  "id": "string",
  "date": "string",
  "name": "string",
  "creator": "string"
}

type GetLobbyListResponse = Lobby[];

class LobbyModel {

  async getLobbyList() {
    const {data, status} = await axios.get<GetLobbyListResponse>(baseUrl + 'list');
    console.log(data, status);
    return data;
  }

}

const lobbyModel = new LobbyModel();

export default lobbyModel;