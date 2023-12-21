// // DocumentEditor.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const DocumentEditor = ({ documentId }) => {
//   const [document, setDocument] = useState({ title: '', content: '' });
//   const [websocket, setWebsocket] = useState(null);
// console.log(documentId,"888888888888888888");
//   useEffect(() => {
//     if (documentId) {
//       axios.get(`/api/documents/${documentId}/`)
//         .then(response => {
//             console.log(response.data,"/////////??????????????");
//           setDocument(response.data);
//           initializeWebSocket(documentId);
//         })
//         .catch(error => console.error('Error fetching document:', error));
//     }
//   }, [documentId]);

//   const initializeWebSocket = (documentId) => {
//     const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
//     const websocket = new WebSocket(`${wsProtocol}//${window.location.host}/ws/documents/${documentId}/`);

//     websocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       if (data.action === 'update_content') {
//         setDocument({ ...document, content: data.content });
//       }
//     };

//     setWebsocket(websocket);

//     return () => websocket.close();
//   };

//   const handleContentChange = (newContent) => {
//     if (websocket && websocket.readyState === WebSocket.OPEN) {
//       websocket.send(JSON.stringify({
//         action: 'update_content',
//         content: newContent,
//       }));
//     }
//   };

//   return (
//     <div>
//       <h2>{document.title}</h2>
//       <textarea
//         value={document.content}
//         onChange={(e) => {
//           setDocument({ ...document, content: e.target.value });
//           handleContentChange(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

// export default DocumentEditor;
