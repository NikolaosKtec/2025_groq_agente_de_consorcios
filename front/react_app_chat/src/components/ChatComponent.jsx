import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './Chat.css';


const ChatComponent = forwardRef((props, ref) => {
  //
  // useEffect(() => {
  //   messages 
  // }, [messages]);


  // Estado para controlar a visibilidade do chat
  const [isOpen, setIsOpen] = useState(false);

  // Estado para armazenar mensagens do chat
  const [messages, setMessages] = useState([
    { text: "Olá! Como posso ajudar você?", sender: "agent" }
  ]);

  // Estado para o valor do input
  const [inputValue, setInputValue] = useState('');

  // Ref para rolar até a última mensagem
  const messagesEndRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const Chat = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
  });

  // Expõe a função toggleChat para o componente pai
  useImperativeHandle(ref, () => ({
    toggleChat
  }));

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInputValue('');
      try {
        // Resposta gerada pelo agente de chat
        fetch("https://2025-groq-adc-server.vercel.app/api/talk", {
          method: "POST",
          body: JSON.stringify(newMessage),
          headers: {
        'Content-Type': 'application/json',
        },

        }).then(responce => responce.json())
          .then(data => {
            setMessages(prev => [...prev,
            { text: data.text, sender: data.sender }
            ]);
          });


      } catch (e) {
        console.log(e)
      }
    }
  };


  return (
    <>
      {/* Botão Flutuante */}
      <div className={`floating-chat-button ${isOpen ? 'hidden' : ''}`} onClick={toggleChat}>
        <div className="chat-icon">
          💬
        </div>
        <div className="notification-dot"></div>
      </div>

      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : 'closed'}`}>
        {/* Header do Chat */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">💬</div>
            <div className="chat-title">
              <h4>Suporte Online</h4>
              <span className="status-online">• Online</span>
            </div>
          </div>
          <button className="close-chat" onClick={toggleChat}>
            ×
          </button>
        </div>

        {/* Área de Mensagens */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <div className="message-content">
                {msg.text}
              </div>
              <div className="message-time">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="chat-input-area">
          <div className="chat-input-container">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="chat-input"
            />
            <button onClick={sendMessage} className="send-button">
              ➤
            </button>
          </div>
        </div>
      </div>

      {/* Overlay para fechar ao clicar fora (em mobile) */}
      {isOpen && <div className="chat-overlay" onClick={toggleChat}></div>}
    </>
  );
});
export default ChatComponent;
