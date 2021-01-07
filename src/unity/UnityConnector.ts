import net from 'net';

class UnityConnector implements Connector {
  private host?: string;
  private port?: string;

  constructor() {
    this.host = process.env.REACT_APP_UNITY_HOST;
    this.port = process.env.REACT_APP_UNITY_PORT;

    console.log(this.host, this.port);
  }
}

export default UnityConnector;
