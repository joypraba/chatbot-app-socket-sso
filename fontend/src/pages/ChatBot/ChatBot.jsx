import React, { useState, useEffect } from "react";
import "./ChatBot.css"
import { io } from "socket.io-client";
import { Link, useLocation, useNavigate  } from "react-router-dom";
const socket = io("http://localhost:5000");
const ChatBot = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userEmail, setUserEmail] = useState(sessionStorage.getItem("userEmail") || "");
    const [agentEmail, setAgentEmail] = useState(sessionStorage.getItem("agentEmail") || "");
    console.log('userEmail', userEmail)
    console.log('agentEmail', agentEmail)
    const navigate = useNavigate(); 
    const sendMessage = async () => {
        if (!message.trim()) return;

        try {
            // Add to chat as user's message
            setMessages(prev => [...prev, { from: 'user', text: message }]);

            // Emit message to server
            // socket.emit('user-message', message);
            socket.emit('user-message', {
                agentEmail: agentEmail,
                text: message
            });

            // Clear input
            setMessage('');
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        setTimeout(()=> socket.emit("register", userEmail), 1000)
        
        socket.on("agent-reply", (msg) => {
            // Append received message from agent
            setMessages(prev => [...prev, { from: 'agent', text: msg }]);
        });

        return () => {
            socket.off("agent-reply");
        };
    }, []);

    return (
        <section>
            <div className="container py-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-6">
                        <div className="card" id="chat2">
                            <div className="card-header d-flex justify-content-between align-items-center p-3">
                                <h5 className="mb-0">Chat</h5>
                            </div>

                            <div className="card-body" style={{ position: 'relative', height: '400px', overflowY: 'auto' }}>
                                {messages.map((msg, index) => (
                                    <div key={index} className={`d-flex flex-row justify-content-${msg.from === 'user' ? 'end' : 'start'} mb-4 pt-1`}>
                                        {msg.from === 'agent' && (
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                                alt="avatar 1"
                                                style={{ width: '45px', height: '100%' }}
                                            />
                                        )}
                                        <div>
                                            <p className={`small p-2 ${msg.from === 'user' ? 'me-3 text-white bg-primary' : 'ms-3 bg-body-tertiary'} mb-1 rounded-3`}>
                                                {msg.text}
                                            </p>
                                        </div>
                                        {msg.from === 'user' && (
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                                alt="avatar 2"
                                                style={{ width: '45px', height: '100%' }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                                <img
                                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                                    alt="avatar 3"
                                    style={{ width: '40px', height: '100%' }}
                                />
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Type message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                />
                                <a className="ms-1 text-muted" href="#!"><i className="fas fa-paperclip"></i></a>
                                <a className="ms-3 text-muted" href="#!"><i className="fas fa-smile"></i></a>
                                <a className="ms-3" href="#!" onClick={sendMessage}><i className="fas fa-paper-plane"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChatBot;
