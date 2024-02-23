import { useEffect, useRef } from "react";
import * as StompJs from "@stomp/stompjs";
import SockJS from "sockjs-client";

const WebSocket = () => {
  const client = useRef(null);
  const basics = useRef(null);
  const client3 = useRef(null);
  const ws2 = useRef(null);
  useEffect(() => {
    //https://medium.com/@dlxotjde_87064/react%EC%97%90%EC%84%9C-websocket-%EC%96%B4%EB%94%94%EA%B9%8C%EC%A7%80-%EC%8D%A8%EB%B4%A4%EB%8B%88-9569826d66fc
    console.log("퍼온 것.");
    let wsUrl = "wss://";
    ws2.current = new WebSocket(wsUrl);
    ws2.current.onopen = () => {
      console.log(ws2.current.readyState);
    };

    return () => {
      if (ws2.current.readyState) {
        console.log("퍼온 것의 return이 작동함");
        ws2.current.send(
          JSON.stringify({
            type: "deleteWsId",
            wsObjectId,
          })
        );
      }
    };
  }, []);

  const goStomp = () => {
    const ws = new WebSocket("wss://43.203.64.7/ws", []);
    client3.current = StompJs.over(ws);
    console.log("goStomp 실행");
    function connect() {
      var socket = new SockJS("/websocket-rabbitmq");
      client3.current = StompJs.over(socket);
    }
    connect();
    // stompClient.connect(headers, function (frame) {
    //   console.log("connected");
    //   const subscription = stompClient.subscribe(
    //     "/chat/message/1",
    //     function (message) {
    //       console.log(message);
    //     }
    //   );
    // });
    return true;
  };

  const stopStomp = () => {
    console.log("stopStomp 실행");
    client3.current.disconnect(function (frame) {
      console.log(frame);
    });
  };

  //BASICS
  /**const basicOpen = () => {
    basics.current = new WebSocket("ws://43.203.64.7:8080/ws");
    basics.current.onopen = () => {
      console.log("베이직 연결 성공");
    };
    basics.current.onmessage = (event) => {
      console.log(event, "베이직 메세지");
    };
    basics.current.onclose = () => {
      console.log("베이직 연결 끊기.");
    };
  };
  const basicClose = () => {
    console.log(basics.current.readyState, "readyState");
    basics.current.close();
  };*/
  //(끝)basics

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: "wss://43.203.64.7:8080/ws",
      connectHeaders: {
        testHeader: "please-work-stomp",
      },
      debug(str) {
        console.log(str, "스톰프 디버거");
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("연결됨");
      },
      onStompError: (frame) => {
        console.error(frame, "스톰프 에러");
      },
    });
    client.current.activate();
  };

  const disconnect = () => {
    console.log("스톰프 연결을 끊었어요");
    client.current?.deactivate();
  };

  return (
    <div>
      <div>
        <h2>WS</h2>
        <p>
          <button>연결</button>
          <button>전달</button>
          <button>끊기</button>
        </p>
      </div>
      <hr />
      <div>
        <h2>SockJS</h2>
        <p>
          <button onClick={goStomp}>연결</button>
          <button>전달</button>
          <button onClick={stopStomp}>끊기</button>
        </p>
      </div>
      <div>
        <h2>Stomp</h2>
        <p>
          <button onClick={connect}>연결</button>
          <button>전달</button>
          <button onClick={disconnect}>끊기</button>
        </p>
      </div>
    </div>
  );
};

export default WebSocket;
